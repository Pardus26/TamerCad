import { BRepSolid } from "./BRepSolid";
import { Curve3 } from "../curve/Curve3";
import { Surface3 } from "../surface/Surface3";
export declare enum LoftContinuity {
    POSITION = "G0",
    TANGENT = "G1",
    CURVATURE = "G2"
}
export interface LoftOptions {
    continuity: LoftContinuity;
    closed: boolean;
    tolerance: number;
}
export interface LoftResult {
    success: boolean;
    surface: Surface3 | null;
    solid: BRepSolid | null;
    warnings: string[];
}
export declare class BRepLoft {
    /**
     * Curve sectionlardan surface loft
     */
    static createSurface(sections: Curve3[], options: LoftOptions): LoftResult;
    /**
     * Solid loft
     */
    static createSolid(sections: Curve3[], options: LoftOptions): LoftResult;
    /**
     * Loft surface üretimi
     */
    static generateSurface(sections: Curve3[], options: LoftOptions): Surface3 | null;
    /**
     * Profil hizalama
     */
    static alignProfiles(sections: Curve3[]): Curve3[];
    /**
     * Guide curve destekli loft
     */
    static guideLoft(sections: Curve3[], guides: Curve3[]): Surface3 | null;
    /**
     * Closed loft
     */
    static closedLoft(sections: Curve3[]): LoftResult;
    /**
     * Surface → Solid
     */
    static surfaceToSolid(surface: Surface3): BRepSolid;
    /**
     * Continuity analizi
     */
    static analyzeContinuity(surface: Surface3): {
        continuity: LoftContinuity;
        smooth: boolean;
    };
    /**
     * Loft doğrulama
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
