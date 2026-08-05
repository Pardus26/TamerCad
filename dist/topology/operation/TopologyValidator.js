export class TopologyValidator {
    validate(solid) {
        const errors = [];
        this.validateSolid(solid, errors);
        this.validateShells(solid, errors);
        this.validateFaces(solid, errors);
        this.validateEdges(solid, errors);
        this.validateVertices(solid, errors);
        this.validateEuler(solid, errors);
        return {
            valid: errors.length === 0,
            errors
        };
    }
    validateSolid(solid, errors) {
        if (!solid) {
            errors.push("Solid is null");
        }
    }
    validateShells(solid, errors) {
        const shells = solid.getShells();
        if (shells.length === 0) {
            errors.push("Solid has no shells");
            return;
        }
        for (const shell of shells) {
            if (!shell.isClosed()) {
                errors.push("Shell is not closed");
            }
            if (shell.faceCount()
                ===
                    0) {
                errors.push("Empty shell");
            }
        }
    }
    validateFaces(solid, errors) {
        const faces = solid.getFaces();
        for (const face of faces) {
            const wire = face.getOuterWire();
            if (!wire) {
                errors.push("Face has no outer wire");
                continue;
            }
            if (!wire.isClosed()) {
                errors.push("Face wire is open");
            }
            if (wire.length()
                ===
                    0) {
                errors.push("Face has zero length wire");
            }
            this.validateWire(wire, errors);
        }
    }
    validateWire(wire, errors) {
        const edges = wire.getEdges();
        for (let i = 0; i < edges.length - 1; i++) {
            if (edges[i].end !==
                edges[i + 1].start) {
                errors.push("Wire edge continuity broken");
            }
        }
    }
    validateEdges(solid, errors) {
        const edges = solid.getEdges();
        const duplicate = [];
        for (const edge of edges) {
            if (!edge.start
                ||
                    !edge.end) {
                errors.push("Edge has invalid vertex");
                continue;
            }
            if (edge.start ===
                edge.end) {
                errors.push("Zero length edge");
            }
            for (const other of edges) {
                if (edge !== other
                    &&
                        edge.equals(other)) {
                    duplicate.push(edge);
                }
            }
        }
        if (duplicate.length) {
            errors.push("Duplicate edges detected");
        }
    }
    validateVertices(solid, errors) {
        const vertices = solid.getVertices();
        for (const vertex of vertices) {
            if (!vertex.position) {
                errors.push("Vertex has no position");
                continue;
            }
            if (vertex.getEdges()
                .length === 0) {
                errors.push("Dangling vertex");
            }
        }
    }
    validateEuler(solid, errors) {
        const V = solid.getVertices()
            .length;
        const E = solid.getEdges()
            .length;
        const F = solid.getFaces()
            .length;
        const chi = V - E + F;
        if (chi !== 2) {
            errors.push("Euler characteristic invalid: "
                +
                    chi);
        }
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
    hasOpenEdges(solid) {
        for (const edge of solid.getEdges()) {
            let count = 0;
            for (const face of solid.getFaces()) {
                if (face.containsEdge(edge)) {
                    count++;
                }
            }
            if (count !== 2) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=TopologyValidator.js.map