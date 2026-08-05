import { Vertex } from "./Vertex";
import { Curve } from "../../geometry/curve/Curve";
export declare class Edge {
    start: Vertex;
    end: Vertex;
    curve: Curve | null;
    reversed: boolean;
    private valid;
    constructor(start: Vertex, end: Vertex, curve?: Curve | null);
    getStartVertex(): Vertex;
    getEndVertex(): Vertex;
    getLength(): number;
    getCurve(): Curve | null;
    setCurve(curve: Curve): void;
    reverse(): void;
    getDirection(): {
        x: number;
        y: number;
        z: number;
    };
    containsVertex(vertex: Vertex): boolean;
    otherVertex(vertex: Vertex): Vertex | null;
    equals(edge: Edge, tolerance?: number): boolean;
    clone(): Edge;
    invalidate(): void;
    isValid(): boolean;
    remove(): void;
}
