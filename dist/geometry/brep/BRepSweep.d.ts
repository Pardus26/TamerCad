import { BRepSolid } from "./BRepSolid";
import { Curve3 } from "../curve/Curve3";
import { Surface3 } from "../surface/Surface3";
export declare enum SweepOrientation {
    FIXED = "fixed",
    NORMAL = "normal",
    FRENET = "frenet"
}
export interface SweepOptions {
    orientation: SweepOrientation;
    twist: number;
    closed: boolean;
    tolerance: number;
}
export interface SweepResult {
    success: boolean;
    surface: Surface3 | null;
    solid: BRepSolid | null;
    warnings: string[];
}
export declare class BRepSweep {
    /**
     * Ana sweep operasyonu
     */
    static sweep(profile: Curve3, path: Curve3, options: SweepOptions): SweepResult;
    /**
     * Sweep surface üretimi
     */
    static generateSurface(profile: Curve3, path: Curve3, options: SweepOptions): Surface3 | null;
    /**
     * Solid sweep
     */
    static solidSweep(profile: Curve3, path: Curve3): SweepResult;
    /**
     * Pipe oluşturma
     */
    static pipe(radius: number, path: Curve3): SweepResult;
    /**
     * Rail destekli sweep
     */
    static railSweep(profile: Curve3, path: Curve3, rail: Curve3): Surface3 | null;
    /**
     * Twist kontrollü sweep
     */
    static twistedSweep(profile: Curve3, path: Curve3, twist: number): SweepResult;
    /**
     * Surface → Solid
     */
    static surfaceToSolid(surface: Surface3 | null): BRepSolid;
    /**
     * Sweep kalite analizi
     */
    static analyze(surface: Surface3): {
        selfIntersection: boolean;
        smooth: boolean;
        curvatureQuality: string;
    };
    /**
     * Validation
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
