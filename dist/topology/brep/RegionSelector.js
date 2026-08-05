import { Point } from "../../geometry/core/Point";
import { SolidClassifier } from "../SolidClassifier";
export class RegionSelector {
    classifier;
    constructor(tolerance = 1e-6) {
        this.classifier =
            new SolidClassifier(tolerance);
    }
    select(operation, facesA, facesB, solidA, solidB) {
        switch (operation) {
            case "union":
                return this.selectUnion(facesA, facesB, solidA, solidB);
            case "difference":
                return this.selectDifference(facesA, facesB, solidA, solidB);
            case "intersection":
                return this.selectIntersection(facesA, facesB, solidA, solidB);
        }
    }
    selectUnion(facesA, facesB, solidA, solidB) {
        const result = [];
        const removed = [];
        const errors = [];
        for (const face of facesA) {
            const state = this.classifyFace(face, solidB);
            if (state === "outside"
                ||
                    state === "surface") {
                result.push(face);
            }
            else {
                removed.push(face);
            }
        }
        for (const face of facesB) {
            const state = this.classifyFace(face, solidA);
            if (state === "outside"
                ||
                    state === "surface") {
                result.push(face);
            }
            else {
                removed.push(face);
            }
        }
        return {
            faces: result,
            removed,
            errors
        };
    }
    selectDifference(facesA, facesB, solidA, solidB) {
        const result = [];
        const removed = [];
        const errors = [];
        for (const face of facesA) {
            const state = this.classifyFace(face, solidB);
            if (state === "outside") {
                result.push(face);
            }
            else {
                removed.push(face);
            }
        }
        for (const face of facesB) {
            const state = this.classifyFace(face, solidA);
            if (state === "inside") {
                const reversed = face.reverse();
                result.push(reversed);
            }
        }
        return {
            faces: result,
            removed,
            errors
        };
    }
    selectIntersection(facesA, facesB, solidA, solidB) {
        const result = [];
        const removed = [];
        for (const face of facesA) {
            const state = this.classifyFace(face, solidB);
            if (state === "inside"
                ||
                    state === "surface") {
                result.push(face);
            }
            else {
                removed.push(face);
            }
        }
        for (const face of facesB) {
            const state = this.classifyFace(face, solidA);
            if (state === "inside"
                ||
                    state === "surface") {
                result.push(face);
            }
            else {
                removed.push(face);
            }
        }
        return {
            faces: result,
            removed,
            errors: []
        };
    }
    classifyFace(face, solid) {
        const center = this.getFaceCenter(face);
        if (!center) {
            return "outside";
        }
        const result = this.classifier
            .classifyPoint(center, solid);
        return result.classification;
    }
    getFaceCenter(face) {
        const vertices = face.getEdges()
            .map(e => e.start.position);
        if (vertices.length === 0) {
            return null;
        }
        let x = 0;
        let y = 0;
        let z = 0;
        for (const p of vertices) {
            x += p.x;
            y += p.y;
            z += p.z;
        }
        return new Point(x / vertices.length, y / vertices.length, z / vertices.length);
    }
}
//# sourceMappingURL=RegionSelector.js.map