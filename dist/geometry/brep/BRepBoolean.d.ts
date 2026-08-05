import { BRepSolid } from "./BRepSolid";
export declare enum BooleanOperation {
    UNION = "union",
    DIFFERENCE = "difference",
    INTERSECTION = "intersection"
}
export declare class BRepBoolean {
    /**
     * Union operasyonu
     *
     * A + B
     */
    static union(a: BRepSolid, b: BRepSolid): BRepSolid;
    /**
     * Difference operasyonu
     *
     * A - B
     */
    static difference(a: BRepSolid, b: BRepSolid): BRepSolid;
    /**
     * Intersection operasyonu
     *
     * A ∩ B
     */
    static intersection(a: BRepSolid, b: BRepSolid): BRepSolid;
    /**
     * Genel boolean çağrısı
     */
    static execute(operation: BooleanOperation, a: BRepSolid, b: BRepSolid): BRepSolid;
    /**
     * Input doğrulama
     */
    private static validateInput;
    /**
     * Boolean sonucu doğrulama
     */
    static validateResult(solid: BRepSolid): boolean;
    /**
     * Debug bilgisi
     */
    static info(operation: BooleanOperation): {
        operation: BooleanOperation;
        engine: string;
        status: string;
    };
}
