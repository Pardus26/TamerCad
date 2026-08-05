import { BRepSolid } from "./BRepSolid";
export declare enum BooleanOperation {
    UNION = "union",
    DIFFERENCE = "difference",
    INTERSECTION = "intersection"
}
export interface BooleanResult {
    success: boolean;
    solid: BRepSolid | null;
    operation: BooleanOperation;
    errors: string[];
}
export declare class BRepBooleanEngine {
    /**
     * Ana boolean giriş noktası
     */
    static execute(a: BRepSolid, b: BRepSolid, operation: BooleanOperation): BooleanResult;
    /**
     * Union
     *
     * A + B
     */
    static union(a: BRepSolid, b: BRepSolid): BooleanResult;
    /**
     * Difference
     *
     * A - B
     */
    static difference(a: BRepSolid, b: BRepSolid): BooleanResult;
    /**
     * Intersection
     *
     * A ∩ B
     */
    static intersection(a: BRepSolid, b: BRepSolid): BooleanResult;
    /**
     * Boolean sonrası kontrol
     */
    static validate(result: BRepSolid): boolean;
    /**
     * Hızlı union
     */
    static add(a: BRepSolid, b: BRepSolid): BRepSolid | null;
    /**
     * Hızlı cut
     */
    static subtract(a: BRepSolid, b: BRepSolid): BRepSolid | null;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
