import { BRepSolid } from "./BRepSolid";
export declare enum ThreadStandard {
    METRIC_ISO = "metric_iso",
    UNIFIED = "unified",
    ACME = "acme",
    CUSTOM = "custom"
}
export declare enum ThreadDirection {
    RIGHT = "right",
    LEFT = "left"
}
export declare enum ThreadMode {
    INTERNAL = "internal",
    EXTERNAL = "external"
}
export interface ThreadOptions {
    diameter: number;
    pitch: number;
    length: number;
    standard: ThreadStandard;
    direction: ThreadDirection;
    mode: ThreadMode;
    angle: number;
}
export interface HelixPoint {
    x: number;
    y: number;
    z: number;
}
export interface ThreadResult {
    success: boolean;
    solid: BRepSolid | null;
    turns: number;
    warnings: string[];
}
export declare class BRepThread {
    /**
     * Ana thread oluşturma
     */
    static create(base: BRepSolid, position: any, options: ThreadOptions): ThreadResult;
    /**
     * Helix üretimi
     */
    static generateHelix(center: any, options: ThreadOptions): HelixPoint[];
    /**
     * Thread profili
     */
    static generateProfile(options: ThreadOptions): {
        type: ThreadStandard;
        angle: number;
        pitch: number;
    };
    /**
     * Helix sweep
     */
    static sweepThread(helix: HelixPoint[], profile: any): BRepSolid;
    /**
     * ISO Metric thread
     */
    static metric(base: BRepSolid, position: any, diameter: number, pitch: number, length: number): ThreadResult;
    /**
     * External thread
     */
    static external(base: BRepSolid, position: any, options: ThreadOptions): ThreadResult;
    /**
     * Internal thread
     */
    static internal(base: BRepSolid, position: any, options: ThreadOptions): ThreadResult;
    /**
     * Sol helix
     */
    static leftHand(options: ThreadOptions): void;
    /**
     * Validation
     */
    static validate(options: ThreadOptions): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
