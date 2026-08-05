import { BRepSolid } from "./BRepSolid";
import { Surface3 } from "../surface/Surface3";
import { BRepSketch } from "./BRepSketch";
export interface ExtrudeDirection {
    x: number;
    y: number;
    z: number;
}
export interface ExtrudeOptions {
    direction: ExtrudeDirection;
    depth: number;
    symmetric: boolean;
    taper: number;
    tolerance: number;
}
export interface ExtrudeResult {
    success: boolean;
    surface: Surface3 | null;
    solid: BRepSolid | null;
    warnings: string[];
}
export declare class BRepExtrude {
    /**
     * Ana extrude operasyonu
     */
    static extrude(sketch: BRepSketch, options: ExtrudeOptions): ExtrudeResult;
    /**
     * Extrude surface üretimi
     */
    static generateSurface(profile: any, options: ExtrudeOptions): Surface3 | null;
    /**
     * Symmetric extrude
     */
    static symmetricExtrude(sketch: BRepSketch, depth: number): ExtrudeResult;
    /**
     * Normal extrude
     */
    static normalExtrude(sketch: BRepSketch, depth: number): ExtrudeResult;
    /**
     * Tapered extrude
     */
    static taperedExtrude(sketch: BRepSketch, depth: number, angle: number): ExtrudeResult;
    /**
     * Thin feature
     */
    static thinExtrude(sketch: BRepSketch, thickness: number): ExtrudeResult;
    /**
     * Surface → Solid
     */
    static surfaceToSolid(surface: Surface3 | null): BRepSolid;
    /**
     * Extrude yön doğrulama
     */
    static validateDirection(direction: ExtrudeDirection): boolean;
    /**
     * Solid kontrol
     */
    static validate(solid: BRepSolid): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
