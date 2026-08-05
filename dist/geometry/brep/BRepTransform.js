import { Transform } from "../../math/transform/Transform";
export class BRepTransform {
    /**
     * Solid translate
     */
    static translate(solid, x, y, z) {
        const result = solid.clone();
        for (const shell of result.shells) {
            for (const face of shell.faces) {
                this.transformFace(face, Transform
                    .translation(x, y, z));
            }
        }
        return result;
    }
    /**
     * Genel transform
     */
    static apply(solid, transform) {
        const result = solid.clone();
        for (const shell of result.shells) {
            for (const face of shell.faces) {
                this.transformFace(face, transform);
            }
        }
        return result;
    }
    /**
     * Face transform
     */
    static transformFace(face, transform) {
        /*
            Surface transform

            Gerçek kernelde:

            - Surface parametreleri
            - UV mapping
            - Trim curve

            güncellenir.
        */
        for (const loop of [
            face.outerLoop,
            ...face.innerLoops
        ]) {
            for (const edge of loop.edges) {
                this.transformVertex(edge.startVertex, transform);
                this.transformVertex(edge.endVertex, transform);
            }
        }
    }
    /**
     * Vertex transform
     */
    static transformVertex(vertex, transform) {
        vertex.point =
            transform.applyPoint(vertex.point);
    }
    /**
     * Scale
     */
    static scale(solid, factor) {
        return this.apply(solid, Transform.scale(factor, factor, factor));
    }
    /**
     * X ekseni mirror
     */
    static mirrorX(solid) {
        return this.apply(solid, Transform.scale(-1, 1, 1));
    }
    /**
     * Y ekseni mirror
     */
    static mirrorY(solid) {
        return this.apply(solid, Transform.scale(1, -1, 1));
    }
    /**
     * Z ekseni mirror
     */
    static mirrorZ(solid) {
        return this.apply(solid, Transform.scale(1, 1, -1));
    }
    /**
     * Bounding transform bilgisi
     */
    static info(operation) {
        return {
            engine: "BRepTransform",
            operation,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepTransform.js.map