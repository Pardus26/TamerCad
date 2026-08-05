import { Edge } from "../core/Edge";
export declare enum EdgeMatchType {
    None = "None",
    SameDirection = "SameDirection",
    OppositeDirection = "OppositeDirection"
}
export interface EdgeMatchResult {
    matched: boolean;
    type: EdgeMatchType;
    distance: number;
}
export declare class EdgeMatcher {
    tolerance: number;
    constructor(tolerance?: number);
    match(edgeA: Edge, edgeB: Edge): EdgeMatchResult;
    equals(a: Edge, b: Edge): boolean;
    sameDirection(a: Edge, b: Edge): boolean;
    oppositeDirection(a: Edge, b: Edge): boolean;
    private sameGeometry;
    private oppositeGeometry;
    private sameVertex;
    private sameCurve;
    private edgeDistance;
    findMatches(edge: Edge, edges: Edge[]): Edge[];
    findOpposite(edge: Edge, candidates: Edge[]): Edge | null;
    findSameDirection(edge: Edge, candidates: Edge[]): Edge | null;
}
