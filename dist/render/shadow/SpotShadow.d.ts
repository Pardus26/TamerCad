import { ShadowMap } from "./ShadowMap";
import { SpotLight } from "../light/SpotLight";
import { RenderCamera } from "../RenderCamera";
export interface SpotShadowOptions {
    mapSize?: number;
    near?: number;
    far?: number;
    bias?: number;
}
export declare class SpotShadow {
    readonly shadowMap: ShadowMap;
    readonly camera: RenderCamera;
    light: SpotLight;
    near: number;
    far: number;
    bias: number;
    enabled: boolean;
    constructor(light: SpotLight, options?: SpotShadowOptions);
    private setupCamera;
    update(): void;
    renderShadow(context: any, scene: any): void;
    setLight(light: SpotLight): void;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    setBias(value: number): void;
    getShadowMap(): ShadowMap;
    getCamera(): RenderCamera;
    toJSON(): {
        enabled: boolean;
        near: number;
        far: number;
        bias: number;
        shadowMap: {
            width: number;
            height: number;
            type: import("./ShadowMap").ShadowMapType;
            bias: number;
            enabled: boolean;
        };
    };
}
