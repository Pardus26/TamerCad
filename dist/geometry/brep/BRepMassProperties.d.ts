import { BRepSolid } from "./BRepSolid";
import { Point3 } from "../point/Point3";
export interface MassProperties {
    volume: number;
    area: number;
    mass: number;
    density: number;
    centerOfMass: Point3;
    inertia: number[][];
}
export declare class BRepMassProperties {
    /**
     * Tüm fiziksel özellikler
     */
    static calculate(solid: BRepSolid, density?: number): MassProperties;
    /**
     * Hacim hesabı
     */
    static volume(solid: BRepSolid): number;
    /**
     * Yüzey alanı
     */
    static surfaceArea(solid: BRepSolid): number;
    /**
     * Kütle merkezi
     */
    static centerOfMass(solid: BRepSolid): Point3;
    /**
     * Atalet tensörü
     */
    static inertiaTensor(solid: BRepSolid, center: Point3): number[][];
    /**
     * Ağırlık hesabı
     */
    static weight(solid: BRepSolid, density: number, gravity?: number): number;
    /**
     * Boş özellik objesi
     */
    static empty(): MassProperties;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
