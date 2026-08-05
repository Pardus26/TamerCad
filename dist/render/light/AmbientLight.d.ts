import { Light, LightType, MaterialColor } from "./Light";
export interface AmbientLightOptions {
    color?: MaterialColor;
    intensity?: number;
}
export declare class AmbientLight extends Light {
    constructor(name?: string, options?: AmbientLightOptions);
    setAmbientColor(color: MaterialColor): void;
    setAmbientIntensity(intensity: number): void;
    applyToShader(shader: any): void;
    getLightData(): {
        ambient: boolean;
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    clone(): AmbientLight;
    toJSON(): {
        id: string;
        type: LightType;
        color: import("../material/Material").MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    static fromJSON(data: any): AmbientLight;
}
