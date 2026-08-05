import { Edge } from "../core/Edge";
import { HalfEdge } from "../core/HalfEdge";
import { Wire } from "../core/Wire";
import { Face } from "../core/Face";
import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
export class BRepBuilder {
    createVertex(vertex) {
        return vertex;
    }
    createEdge(start, end, curve = null) {
        if (start === end) {
            throw new Error("Edge start and end cannot be same vertex");
        }
        return new Edge(start, end, curve);
    }
    createWire(edges) {
        if (edges.length === 0) {
            throw new Error("Cannot create empty wire");
        }
        const wire = new Wire();
        for (const edge of edges) {
            wire.addEdge(edge);
        }
        wire.close();
        if (!wire.isClosed()) {
            throw new Error("Wire creation failed: not closed");
        }
        return wire;
    }
    createFace(surface, wire) {
        if (!wire.isClosed()) {
            throw new Error("Face requires closed wire");
        }
        return new Face(surface, wire);
    }
    addInnerWire(face, wire) {
        if (!wire.isClosed()) {
            throw new Error("Hole wire must be closed");
        }
        face.addInnerWire(wire);
    }
    createShell(faces) {
        if (faces.length === 0) {
            throw new Error("Shell requires faces");
        }
        return new Shell(faces);
    }
    createSolid(shell) {
        return new Solid(shell);
    }
    createSolidFromFaces(faces) {
        return this.createSolid(this.createShell(faces));
    }
    connectTwinEdges(edgeA, edgeB) {
        const halfA = new HalfEdge(edgeA, edgeA.start, edgeA.end);
        const halfB = new HalfEdge(edgeB, edgeB.end, edgeB.start);
        halfA.setTwin(halfB);
        return [
            halfA,
            halfB
        ];
    }
    validateWire(wire) {
        if (!wire) {
            return false;
        }
        if (wire.getEdges()
            .length === 0) {
            return false;
        }
        return wire.isClosed();
    }
    validateFace(face) {
        if (!face) {
            return false;
        }
        const wire = face.getOuterWire();
        return this.validateWire(wire);
    }
    validateShell(shell) {
        if (!shell) {
            return false;
        }
        return (shell.getFaces()
            .length > 0
            &&
                shell.isClosed());
    }
    validateSolid(solid) {
        if (!solid) {
            return false;
        }
        return solid.isValid();
    }
}
//# sourceMappingURL=BRepBuilder.js.map