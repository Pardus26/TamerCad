import { Vertex } from "../core/Vertex";
import { Edge } from "../core/Edge";
import { HalfEdge } from "../core/HalfEdge";
import { Wire } from "../core/Wire";
import { Face } from "../core/Face";
import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
import { Surface } from "../../geometry/surface/Surface";
export declare class BRepBuilder {
    createVertex(vertex: Vertex): Vertex;
    createEdge(start: Vertex, end: Vertex, curve?: any): Edge;
    createWire(edges: Edge[]): Wire;
    createFace(surface: Surface | null, wire: Wire): Face;
    addInnerWire(face: Face, wire: Wire): void;
    createShell(faces: Face[]): Shell;
    createSolid(shell: Shell): Solid;
    createSolidFromFaces(faces: Face[]): Solid;
    connectTwinEdges(edgeA: Edge, edgeB: Edge): [
        HalfEdge,
        HalfEdge
    ];
    validateWire(wire: Wire): boolean;
    validateFace(face: Face): boolean;
    validateShell(shell: Shell): boolean;
    validateSolid(solid: Solid): boolean;
}
