import { BRepSolid } from "./BRepSolid";
import { BRepSketch } from "./BRepSketch";
export declare enum PocketType {
    BLIND = "blind",
    THROUGH_ALL = "through_all",
    TWO_DIRECTION = "two_direction"
}
export interface PocketOptions {
    depth: number;
    type: PocketType;
    direction: {
        x: number;
        y: number;
        z: number;
    };
    reverse: boolean;
}
export interface PocketResult {
    success: boolean;
    solid: BRepSolid | null;
    removedVolume: number;
    warnings: string[];
}
export declare class BRepPocket {
    /**
     * Ana pocket operasyonu
     */
    static create(base: BRepSolid, sketch: BRepSketch, options: PocketOptions): PocketResult;
    /**
     * Kesici solid üretimi
     */
    static createCutter(sketch: BRepSketch, options: PocketOptions): BRepSolid;
    /**
     * Blind pocket
     */
    static blind(base: BRepSolid, sketch: BRepSketch, depth: number): PocketResult;
    /**
     * Through all pocket
     */
    static throughAll(base: BRepSolid, sketch: BRepSketch): PocketResult;
    /**
     * Two direction cut
     */
    static twoDirection(base: BRepSolid, sketch: BRepSketch, depth: number): PocketResult;
    /**
     * Pocket yön değiştirme
     */
    static reverseDirection(options: PocketOptions): void;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
