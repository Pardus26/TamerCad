import { Solid } from "../core/Solid";
import { Shell } from "../core/Shell";
import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { Wire } from "../core/Wire";
import { Vertex } from "../core/Vertex";
import { BRepBuilder } from "../brep/BRepBuilder";
export declare class EulerOperators {
    private builder;
    constructor(builder?: BRepBuilder);
    makeVertex(x: number, y: number, z: number): Vertex;
    makeEdge(start: Vertex, end: Vertex): Edge;
    makeWire(edges: Edge[]): Wire;
    makeFace(wire: Wire): Face;
    addFaceToShell(shell: Shell, face: Face): void;
    removeFaceFromShell(shell: Shell, face: Face): void;
    splitEdge(edge: Edge, vertex: Vertex): Edge[];
    joinEdges(edgeA: Edge, edgeB: Edge): Edge | null;
    addHole(face: Face, wire: Wire): void;
    removeHole(face: Face, wire: Wire): boolean;
    mergeFaces(faceA: Face, faceB: Face): Face | null;
    checkEuler(solid: Solid): boolean;
    getBuilder(): BRepBuilder;
}
