import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
import { FaceSewing } from "./FaceSewing";
import { TopologyValidator } from "./TopologyValidator";
export class BooleanResultBuilder {
    tolerance;
    sewing;
    validator;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
        this.sewing =
            new FaceSewing(tolerance);
        this.validator =
            new TopologyValidator();
    }
    buildFromFaces(faces, options = {}) {
        const errors = [];
        if (faces.length === 0) {
            return {
                solid: null,
                success: false,
                errors: [
                    "No faces supplied"
                ]
            };
        }
        let solid = null;
        try {
            if (options.sew !== false) {
                const sewn = this.sewing
                    .sewFaces(faces);
                if (!sewn.sewn) {
                    errors.push(...sewn.errors);
                }
                solid =
                    new Solid(sewn.shell);
            }
            else {
                solid =
                    new Solid(new Shell(faces));
            }
        }
        catch (error) {
            errors.push(error.message);
        }
        if (!solid) {
            return {
                solid: null,
                success: false,
                errors
            };
        }
        if (options.validate !== false) {
            const validation = this.validator
                .validate(solid);
            if (!validation.valid) {
                errors.push(...validation.errors);
            }
        }
        return {
            solid,
            success: errors.length === 0,
            errors
        };
    }
    unionFaces(facesA, facesB) {
        return this.buildFromFaces([
            ...facesA,
            ...facesB
        ]);
    }
    buildShell(faces) {
        const result = this.sewing
            .sewFaces(faces);
        if (!result.sewn) {
            throw new Error(result.errors.join("\n"));
        }
        return result.shell;
    }
    removeDuplicateFaces(faces) {
        const result = [];
        for (const face of faces) {
            let duplicate = false;
            for (const existing of result) {
                if (this.sameFace(face, existing)) {
                    duplicate =
                        true;
                    break;
                }
            }
            if (!duplicate) {
                result.push(face);
            }
        }
        return result;
    }
    filterFaces(faces, predicate) {
        return faces.filter(predicate);
    }
    createSolid(shell) {
        return new Solid(shell);
    }
    validate(solid) {
        return this.validator
            .validate(solid)
            .valid;
    }
    sameFace(a, b) {
        const edgesA = a.getEdges();
        const edgesB = b.getEdges();
        if (edgesA.length !==
            edgesB.length) {
            return false;
        }
        for (const edge of edgesA) {
            const exists = edgesB.some(e => e.equals(edge, this.tolerance));
            if (!exists) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=BooleanResultBuilder.js.map