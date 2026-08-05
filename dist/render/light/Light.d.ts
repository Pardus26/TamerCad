import { MaterialColor } from "../material/Material";
export declare enum LightType {
    Ambient = "Ambient",
    Directional = "Directional",
    Point = "Point",
    Spot = "Spot"
}
export interface LightColor {
    color: MaterialColor;
    intensity: number;
}
export declare class Light {
    readonly type: LightType;
    readonly id: string;
    enabled: boolean;
    color: MaterialColor;
    intensity: number;
    constructor(type: LightType, name?: string);
    setColor(color: MaterialColor): void;
    setIntensity(value: number): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    getLightData(): {
        id: string;
        type: LightType;
        color: MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    clone(): Light;
    toJSON(): {
        id: string;
        type: LightType;
        color: MaterialColor;
        intensity: number;
        enabled: boolean;
    };
    static fromJSON(data: any): Light;
    private static generateId;
}
