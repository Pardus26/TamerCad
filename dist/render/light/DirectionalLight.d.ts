import { Light, LightType } from "./Light";
import { Point3 } from "../../geometry/primitives/Point3";
export interface DirectionalLightOptions {
    direction?: Point3;
    intensity?: number;
    color?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
export declare class DirectionalLight extends Light {
    /**
     * Işık yönü
     *
     * Normalize edilecek yön vektörü
     */
    direction: Point3;
    constructor(name?: string, options?: DirectionalLightOptions);
    setDirection(direction: Point3): void;
    getDirection(): Point3;
    getLightData(): {
        direction: Point3;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    clone(): DirectionalLight;
    toJSON(): {
        direction: Point3;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    static fromJSON(data: any): DirectionalLight;
}
