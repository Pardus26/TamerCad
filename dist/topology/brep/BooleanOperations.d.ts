import { Solid } from "../core/Solid";
export type BooleanOperation = "union" | "difference" | "intersection";
export interface BooleanResult {
    solid: Solid | null;
    success: boolean;
    errors: string[];
}
export declare class BooleanOperations {
    private sewing;
    private splitter;
    private resultBuilder;
    private validator;
    private classifier;
    constructor(tolerance?: number);
    union(a: Solid, b: Solid): BooleanResult;
    difference(a: Solid, b: Solid): BooleanResult;
    intersection(a: Solid, b: Solid): BooleanResult;
    private execute;
    private buildUnion;
    private buildDifference;
    private buildIntersection;
    private faceCenter;
}
