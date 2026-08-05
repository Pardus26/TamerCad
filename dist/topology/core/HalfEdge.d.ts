import { Edge } from "./Edge";
import { Vertex } from "./Vertex";
export declare class HalfEdge {
    edge: Edge;
    start: Vertex;
    end: Vertex;
    next: HalfEdge | null;
    previous: HalfEdge | null;
    twin: HalfEdge | null;
    constructor(edge: Edge, start: Vertex, end: Vertex);
    setNext(halfEdge: HalfEdge | null): void;
    setPrevious(halfEdge: HalfEdge | null): void;
    setTwin(halfEdge: HalfEdge | null): void;
    getStart(): Vertex;
    getEnd(): Vertex;
    getEdge(): Edge;
    getNext(): HalfEdge | null;
    getPrevious(): HalfEdge | null;
    getTwin(): HalfEdge | null;
    reverse(): HalfEdge;
    length(): number;
    connects(vertex: Vertex): boolean;
    isClosed(): boolean;
    clone(): HalfEdge;
    hasTwin(): boolean;
    hasLoop(): boolean;
}
