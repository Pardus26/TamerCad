import { BRepSolid } from "./BRepSolid";
import { BRepSketch } from "./BRepSketch";
export declare enum BossType {
    BLIND = "blind",
    SYMMETRIC = "symmetric",
    THROUGH = "through"
}
export interface BossOptions {
    height: number;
    type: BossType;
    direction: {
        x: number;
        y: number;
        z: number;
    };
    taper: number;
}
export interface BossResult {
    success: boolean;
    solid: BRepSolid | null;
    addedVolume: number;
    warnings: string[];
}
export declare class BRepBoss {
    /**
     * Ana boss oluşturma
     */
    static create(base: BRepSolid, sketch: BRepSketch, options: BossOptions): BossResult;
    /**
     * Boss solid üretimi
     */
    static createFeatureSolid(sketch: BRepSketch, options: BossOptions): BRepSolid;
    /**
     * Normal boss
     */
    static blind(base: BRepSolid, sketch: BRepSketch, height: number): BossResult;
    /**
     * Symmetric boss
     */
    static symmetric(base: BRepSolid, sketch: BRepSketch, height: number): BossResult;
    /**
     * Draft angle boss
     */
    static tapered(base: BRepSolid, sketch: BRepSketch, height: number, angle: number): BossResult;
    /**
     * Attachment face kontrolü
     */
    static attachToFace(faceId: string): {
        attached: boolean;
        face: string;
    };
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
