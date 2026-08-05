import { ShadowMap } from "./ShadowMap";
import { DirectionalLight } from "../light/DirectionalLight";
import { RenderCamera } from "../RenderCamera";
export interface DirectionalShadowOptions {
    mapSize?: number;
    cameraSize?: number;
    near?: number;
    far?: number;
    bias?: number;
}
export declare class DirectionalShadow {
    readonly shadowMap: ShadowMap;
    readonly camera: RenderCamera;
    light: DirectionalLight;
    cameraSize: number;
    near: number;
    far: number;
    bias: number;
    enabled: boolean;
    constructor(light: DirectionalLight, options?: DirectionalShadowOptions);
    update(): void;
    renderShadow(context: any, scene: any): void;
    setLight(light: DirectionalLight): void;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    setBias(value: number): void;
    getShadowMap(): ShadowMap;
    getCamera(): RenderCamera;
    toJSON(): {
        enabled: boolean;
        cameraSize: number;
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
