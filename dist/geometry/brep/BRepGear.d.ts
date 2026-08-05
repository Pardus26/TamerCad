import { BRepSolid } from "./BRepSolid";
export declare enum GearType {
    SPUR = "spur",
    HELICAL = "helical",
    INTERNAL = "internal"
}
export interface GearOptions {
    teeth: number;
    module: number;
    pressureAngle: number;
    width: number;
    type: GearType;
    helixAngle: number;
}
export interface GearPoint {
    x: number;
    y: number;
}
export interface GearResult {
    success: boolean;
    solid: BRepSolid | null;
    pitchDiameter: number;
    warnings: string[];
}
export declare class BRepGear {
    /**
     * Ana gear üretimi
     */
    static create(options: GearOptions): GearResult;
    /**
     * Pitch diameter
     *
     * d = z * m
     */
    static pitchDiameter(options: GearOptions): number;
    /**
     * Involute diş profili
     */
    static generateInvolute(options: GearOptions): GearPoint[];
    /**
     * Base circle
     */
    static baseCircleRadius(options: GearOptions): number;
    /**
     * Tooth profile
     */
    static generateProfile(options: GearOptions): {
        points: GearPoint[];
        teeth: number;
    };
    /**
     * Diş çoğaltma
     */
    static patternTeeth(profile: any, count: number): any[];
    /**
     * Gear extrusion
     */
    static extrudeGear(profile: any, options: GearOptions): BRepSolid;
    /**
     * Spur gear
     */
    static spur(teeth: number, module: number, width: number): GearResult;
    /**
     * Helical gear
     */
    static helical(teeth: number, module: number, width: number, helixAngle: number): GearResult;
    /**
     * Gear pair meshing
     */
    static gearPair(gearA: GearOptions, gearB: GearOptions): {
        ratio: number;
        distance: number;
    };
    /**
     * Validation
     */
    static validate(options: GearOptions): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
