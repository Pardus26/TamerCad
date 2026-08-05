import { ShadowMap } from "./ShadowMap";
import { PointLight } from "../light/PointLight";
import { RenderCamera } from "../RenderCamera";
export interface PointShadowOptions {
    mapSize?: number;
    near?: number;
    far?: number;
    bias?: number;
}
export declare class PointShadow {
    readonly shadowMap: ShadowMap;
    readonly cameras: RenderCamera[];
    light: PointLight;
    near: number;
    far: number;
    bias: number;
    enabled: boolean;
    /**
     * Cubemap yönleri
     *
     * +X -X +Y -Y +Z -Z
     */
    private readonly directions;
    constructor(light: PointLight, options?: PointShadowOptions);
    private createCameras;
    update(): void;
    renderShadow(context: any, scene: any): void;
    setLight(light: PointLight): void;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    setBias(value: number): void;
    getShadowMap(): ShadowMap;
    getCameras(): RenderCamera[];
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
