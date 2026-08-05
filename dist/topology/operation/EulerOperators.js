import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
import { Point } from "../../geometry/core/Point";
import { BRepBuilder } from "../brep/BRepBuilder";
export class EulerOperators {
    builder;
    constructor(builder = new BRepBuilder()) {
        this.builder = builder;
    }
    makeVertex(x, y, z) {
        return this.builder
            .createVertex(new Vertex(new Point(x, y, z)));
    }
    makeEdge(start, end) {
        return this.builder
            .createEdge(start, end);
    }
    makeWire(edges) {
        return this.builder
            .createWire(edges);
    }
    makeFace(wire) {
        return this.builder
            .createFace(null, wire);
    }
    addFaceToShell(shell, face) {
        shell.addFace(face);
    }
    removeFaceFromShell(shell, face) {
        shell.removeFace(face);
    }
    splitEdge(edge, vertex) {
        const first = new Edge(edge.start, vertex, edge.curve);
        const second = new Edge(vertex, edge.end, edge.curve);
        return [
            first,
            second
        ];
    }
    joinEdges(edgeA, edgeB) {
        if (edgeA.end !==
            edgeB.start) {
            return null;
        }
        return new Edge(edgeA.start, edgeB.end, edgeA.curve);
    }
    addHole(face, wire) {
        face.addInnerWire(wire);
    }
    removeHole(face, wire) {
        const holes = face.getInnerWires();
        const index = holes.indexOf(wire);
        if (index === -1) {
            return false;
        }
        holes.splice(index, 1);
        return true;
    }
    mergeFaces(faceA, faceB) {
        const shared = faceA.getEdges()
            .find(edge => faceB.containsEdge(edge));
        if (!shared) {
            return null;
        }
        const edges = [
            ...faceA.getEdges()
                .filter(e => e !== shared),
            ...faceB.getEdges()
                .filter(e => e !== shared)
        ];
        if (edges.length === 0) {
            return null;
        }
        const wire = this.makeWire(edges);
        return this.makeFace(wire);
    }
    checkEuler(solid) {
        const V = solid.getVertices()
            .length;
        const E = solid.getEdges()
            .length;
        const F = solid.getFaces()
            .length;
        return (V -
            E +
            F)
            ===
                2;
    }
    getBuilder() {
        return this.builder;
    }
}
//# sourceMappingURL=EulerOperators.js.map