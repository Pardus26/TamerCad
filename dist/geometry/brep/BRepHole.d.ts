import { BRepSolid } from "./BRepSolid";
export declare enum HoleType {
    BLIND = "blind",
    THROUGH = "through",
    COUNTERBORE = "counterbore",
    COUNTERSINK = "countersink"
}
export declare enum ThreadType {
    NONE = "none",
    METRIC = "metric",
    UNIFIED = "unified"
}
export interface HoleOptions {
    diameter: number;
    depth: number;
    type: HoleType;
    direction: {
        x: number;
        y: number;
        z: number;
    };
    thread: ThreadType;
    threadPitch: number;
}
export interface HoleResult {
    success: boolean;
    solid: BRepSolid | null;
    removedVolume: number;
    warnings: string[];
}
export declare class BRepHole {
    /**
     * Ana hole operasyonu
     */
    static create(base: BRepSolid, position: any, options: HoleOptions): HoleResult;
    /**
     * Kesici silindir üretimi
     */
    static createCutter(position: any, options: HoleOptions): BRepSolid;
    /**
     * Basit matkap deliği
     */
    static drill(base: BRepSolid, position: any, diameter: number, depth: number): HoleResult;
    /**
     * Through hole
     */
    static through(base: BRepSolid, position: any, diameter: number): HoleResult;
    /**
     * Counterbore
     */
    static counterbore(base: BRepSolid, position: any, holeDiameter: number, boreDiameter: number, depth: number): HoleResult;
    /**
     * Countersink
     */
    static countersink(base: BRepSolid, position: any, diameter: number, angle: number): HoleResult;
    /**
     * Diş hazırlığı
     */
    static thread(options: HoleOptions, type: ThreadType, pitch: number): void;
    /**
     * Hole validation
     */
    static validate(options: HoleOptions): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
