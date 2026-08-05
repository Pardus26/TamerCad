import { BRepSolid } from "./BRepSolid";
export declare enum PatternType {
    LINEAR = "linear",
    CIRCULAR = "circular",
    MIRROR = "mirror"
}
export interface PatternDirection {
    x: number;
    y: number;
    z: number;
}
export interface PatternOptions {
    type: PatternType;
    count: number;
    spacing: number;
    direction?: PatternDirection;
    angle?: number;
    tolerance: number;
}
export interface PatternResult {
    success: boolean;
    solids: BRepSolid[];
    instances: number;
    warnings: string[];
}
export declare class BRepPattern {
    /**
     * Ana pattern operasyonu
     */
    static apply(solid: BRepSolid, options: PatternOptions): PatternResult;
    /**
     * Linear pattern
     *
     * Örnek:
     *
     * Vida delikleri sıralama
     */
    static linear(solid: BRepSolid, options: PatternOptions): PatternResult;
    /**
     * Circular pattern
     *
     * Örnek:
     *
     * Flanş delikleri
     */
    static circular(solid: BRepSolid, options: PatternOptions): PatternResult;
    /**
     * Mirror pattern
     */
    static mirror(solid: BRepSolid, options: PatternOptions): PatternResult;
    /**
     * Feature çoğaltma
     */
    static duplicate(solid: BRepSolid, count: number): PatternResult;
    /**
     * Pattern geçerlilik kontrolü
     */
    static validate(solids: BRepSolid[]): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
