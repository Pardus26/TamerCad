import { Edge } from "./Edge";
import { HalfEdge } from "./HalfEdge";
import { Vertex } from "./Vertex";
export declare class Wire {
    private halfEdges;
    constructor();
    addEdge(edge: Edge): void;
    addHalfEdge(halfEdge: HalfEdge): void;
    getHalfEdges(): HalfEdge[];
    getEdges(): Edge[];
    getVertices(): Vertex[];
    close(): void;
    isClosed(): boolean;
    isValid(): boolean;
    length(): number;
    containsEdge(edge: Edge): boolean;
    removeEdge(edge: Edge): void;
    clear(): void;
    clone(): Wire;
}
