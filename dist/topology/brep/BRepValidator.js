export class BRepValidator {
    tolerance;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
    }
    validate(model) {
        const errors = [];
        const warnings = [];
        if (model.isEmpty()) {
            errors.push("BRep model is empty");
            return {
                valid: false,
                errors,
                warnings
            };
        }
        for (const solid of model.getSolids()) {
            this.validateSolidInternal(solid, errors, warnings);
        }
        this.validateDuplicateTopology(model, errors);
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }
    validateSolid(solid) {
        const errors = [];
        const warnings = [];
        this.validateSolidInternal(solid, errors, warnings);
        return {
            valid: errors.length === 0,
            errors,
            warnings
        };
    }
    validateSolidInternal(solid, errors, warnings) {
        if (!solid) {
            errors.push("Null solid");
            return;
        }
        this.validateShells(solid, errors);
        this.validateFaces(solid, errors);
        this.validateEdges(solid, errors);
        this.validateVertices(solid, errors);
        if (!this.isManifold(solid)) {
            errors.push("Solid is not manifold");
        }
        if (!this.checkEuler(solid)) {
            warnings.push("Euler characteristic is not 2");
        }
    }
    validateShells(solid, errors) {
        const shells = solid.getShells();
        if (shells.length === 0) {
            errors.push("Solid has no shells");
            return;
        }
        for (const shell of shells) {
            if (!shell) {
                errors.push("Null shell");
                continue;
            }
            if (shell.faceCount()
                ===
                    0) {
                errors.push("Shell has no faces");
            }
            if (!shell.isClosed()) {
                errors.push("Shell is open");
            }
        }
    }
    validateFaces(solid, errors) {
        for (const face of solid.getFaces()) {
            if (!face) {
                errors.push("Null face");
                continue;
            }
            if (!face.isValid()) {
                errors.push("Invalid face");
            }
            const outer = face.getOuterWire();
            if (!outer) {
                errors.push("Face has no outer wire");
                continue;
            }
            if (!outer.isClosed()) {
                errors.push("Face outer wire is open");
            }
            if (face.getEdges()
                .length === 0) {
                errors.push("Face contains no edges");
            }
        }
    }
    validateEdges(solid, errors) {
        for (const edge of solid.getEdges()) {
            if (!edge) {
                errors.push("Null edge");
                continue;
            }
            if (!edge.start
                ||
                    !edge.end) {
                errors.push("Edge missing vertices");
                continue;
            }
            if (edge.start ===
                edge.end) {
                errors.push("Edge has same start and end vertex");
            }
            if (edge.getLength()
                <=
                    this.tolerance) {
                errors.push("Degenerate edge");
            }
        }
    }
    validateVertices(solid, errors) {
        for (const vertex of solid.getVertices()) {
            if (!vertex) {
                errors.push("Null vertex");
                continue;
            }
            if (!vertex.position) {
                errors.push("Vertex has no position");
            }
            if (vertex.getEdges()
                .length === 0) {
                errors.push("Dangling vertex");
            }
        }
    }
    validateDuplicateTopology(model, errors) {
        const vertices = model.getVertices();
        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                if (vertices[i]
                    .position
                    .equals(vertices[j]
                    .position, this.tolerance)) {
                    errors.push("Duplicate vertices detected");
                }
            }
        }
        const edges = model.getEdges();
        for (let i = 0; i < edges.length; i++) {
            for (let j = i + 1; j < edges.length; j++) {
                if (this.sameEdge(edges[i], edges[j])) {
                    errors.push("Duplicate edges detected");
                }
            }
        }
    }
    sameEdge(a, b) {
        return ((a.start.position.equals(b.start.position, this.tolerance)
            &&
                a.end.position.equals(b.end.position, this.tolerance))
            ||
                (a.start.position.equals(b.end.position, this.tolerance)
                    &&
                        a.end.position.equals(b.start.position, this.tolerance)));
    }
    isManifold(solid) {
        for (const edge of solid.getEdges()) {
            let usage = 0;
            for (const face of solid.getFaces()) {
                if (face.containsEdge(edge)) {
                    usage++;
                }
            }
            if (usage !== 2) {
                return false;
            }
        }
        return true;
    }
    checkEuler(solid) {
        const vertices = solid.getVertices()
            .length;
        const edges = solid.getEdges()
            .length;
        const faces = solid.getFaces()
            .length;
        return (vertices -
            edges +
            faces)
            ===
                2;
    }
    hasOpenBoundary(solid) {
        for (const edge of solid.getEdges()) {
            let usage = 0;
            for (const face of solid.getFaces()) {
                if (face.containsEdge(edge)) {
                    usage++;
                }
            }
            if (usage === 1) {
                return true;
            }
        }
        return false;
    }
    validateOrThrow(model) {
        const result = this.validate(model);
        if (!result.valid) {
            throw new Error(result.errors.join("\n"));
        }
    }
}
//# sourceMappingURL=BRepValidator.js.map