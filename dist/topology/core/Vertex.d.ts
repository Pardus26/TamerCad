import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Edge } from "./Edge";
export declare class Vertex {
    position: Point;
    private edges;
    constructor(position: Point);
    addEdge(edge: Edge): void;
    removeEdge(edge: Edge): void;
    getEdges(): Edge[];
    degree(): number;
    distanceTo(vertex: Vertex): number;
    equals(vertex: Vertex, tolerance?: number): boolean;
    clone(): Vertex;
    translate(vector: Vector3): Vertex;
    setPosition(point: Point): void;
    getPosition(): Point;
}
