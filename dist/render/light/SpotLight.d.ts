import { Light, LightType, MaterialColor } from "./Light";
import { Point3 } from "../../geometry/primitives/Point3";
export interface SpotLightOptions {
    position?: Point3;
    direction?: Point3;
    color?: MaterialColor;
    intensity?: number;
    angle?: number;
    penumbra?: number;
    distance?: number;
    decay?: number;
}
export declare class SpotLight extends Light {
    /**
     * Işık başlangıç noktası
     */
    position: Point3;
    /**
     * Işık yönü
     */
    direction: Point3;
    /**
     * Konik ışık açısı
     *
     * Radyan
     */
    angle: number;
    /**
     * Yumuşak geçiş bölgesi
     */
    penumbra: number;
    /**
     * Maksimum mesafe
     */
    distance: number;
    /**
     * Işık düşüş katsayısı
     */
    decay: number;
    constructor(name?: string, options?: SpotLightOptions);
    setPosition(position: Point3): void;
    getPosition(): Point3;
    setDirection(direction: Point3): void;
    getDirection(): Point3;
    setAngle(angle: number): void;
    setPenumbra(value: number): void;
    calculateSpotEffect(lightDirection: Point3): number;
    getLightData(): {
        position: Point3;
        direction: Point3;
        angle: number;
        penumbra: number;
        distance: number;
        decay: number;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    clone(): SpotLight;
    toJSON(): {
        position: Point3;
        direction: Point3;
        angle: number;
        penumbra: number;
        distance: number;
        decay: number;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    static fromJSON(data: any): SpotLight;
}
