import { Light, LightType, MaterialColor } from "./Light";
import { Point3 } from "../../geometry/primitives/Point3";
export interface PointLightOptions {
    position?: Point3;
    color?: MaterialColor;
    intensity?: number;
    constant?: number;
    linear?: number;
    quadratic?: number;
    distance?: number;
}
export declare class PointLight extends Light {
    /**
     * Dünya koordinatındaki ışık pozisyonu
     */
    position: Point3;
    /**
     * Attenuation katsayıları
     *
     * 1 / (constant +
     * linear*d +
     * quadratic*d²)
     */
    constant: number;
    linear: number;
    quadratic: number;
    /**
     * Maksimum etki mesafesi
     */
    distance: number;
    constructor(name?: string, options?: PointLightOptions);
    setPosition(position: Point3): void;
    getPosition(): Point3;
    setAttenuation(constant: number, linear: number, quadratic: number): void;
    calculateAttenuation(distance: number): number;
    getLightData(): {
        position: Point3;
        constant: number;
        linear: number;
        quadratic: number;
        distance: number;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    clone(): PointLight;
    toJSON(): {
        position: Point3;
        constant: number;
        linear: number;
        quadratic: number;
        distance: number;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    static fromJSON(data: any): PointLight;
}
