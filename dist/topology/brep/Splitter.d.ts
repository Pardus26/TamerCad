import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
import { Solid } from "../core/Solid";
import { Point } from "../../geometry/core/Point";
import { Curve } from "../../geometry/curve/Curve";
export interface SplitResult {
    faces: Face[];
    edges: Edge[];
    vertices: Vertex[];
    success: boolean;
    errors: string[];
}
export interface IntersectionResult {
    intersects: boolean;
    points: Point[];
    curve: Curve | null;
}
export declare class Splitter {
    tolerance: number;
    private classifier;
    constructor(tolerance?: number);
    splitFace(face: Face, splitterCurve: Curve): SplitResult;
    splitSolid(solid: Solid, tool: Solid): SplitResult;
    intersectFaces(a: Face, b: Face): IntersectionResult;
    private findCurveIntersections;
    private createSplitEdges;
    private createSplitWires;
    private collectVertices;
    splitEdge(edge: Edge, parameter: number): Edge[];
    private interpolate;
}
