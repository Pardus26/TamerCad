import { BRepSolid } from "./BRepSolid";
import { Curve3 } from "../curve/Curve3";
import { Surface3 } from "../surface/Surface3";
import { Point3 } from "../point/Point3";
export interface RevolutionAxis {
    origin: Point3;
    direction: Point3;
}
export interface RevolveOptions {
    axis: RevolutionAxis;
    angle: number;
    closed: boolean;
    tolerance: number;
}
export interface RevolveResult {
    success: boolean;
    surface: Surface3 | null;
    solid: BRepSolid | null;
    warnings: string[];
}
export declare class BRepRevolve {
    /**
     * Ana revolve operasyonu
     */
    static revolve(profile: Curve3, options: RevolveOptions): RevolveResult;
    /**
     * Revolved surface üretimi
     */
    static generateSurface(profile: Curve3, options: RevolveOptions): Surface3 | null;
    /**
     * Tam 360 derece revolve
     */
    static fullRevolve(profile: Curve3, axis: RevolutionAxis): RevolveResult;
    /**
     * Kısmi açı revolve
     */
    static partialRevolve(profile: Curve3, axis: RevolutionAxis, angle: number): RevolveResult;
    /**
     * Lathe parça oluşturma
     */
    static lathe(profile: Curve3, axis: RevolutionAxis): RevolveResult;
    /**
     * Surface → Solid
     */
    static surfaceToSolid(surface: Surface3 | null): BRepSolid;
    /**
     * Axis kontrolü
     */
    static validateAxis(axis: RevolutionAxis): boolean;
    /**
     * Self intersection kontrolü
     */
    static analyze(surface: Surface3): {
        selfIntersection: boolean;
        seamDetected: boolean;
        smooth: boolean;
    };
    /**
     * Solid doğrulama
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
