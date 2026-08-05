import { RenderContext } from "../RenderContext";
export declare enum ShadowMapType {
    Basic = "Basic",
    PCF = "PCF",
    VSM = "VSM"
}
export interface ShadowMapOptions {
    width?: number;
    height?: number;
    type?: ShadowMapType;
    bias?: number;
    enabled?: boolean;
}
export declare class ShadowMap {
    private gpuTexture;
    private depthBuffer;
    private initialized;
    readonly width: number;
    readonly height: number;
    readonly type: ShadowMapType;
    bias: number;
    enabled: boolean;
    constructor(options?: ShadowMapOptions);
    initialize(context: RenderContext): void;
    bind(context: RenderContext): void;
    unbind(context: RenderContext): void;
    setBias(value: number): void;
    setEnabled(value: boolean): void;
    isEnabled(): boolean;
    getTexture(): any;
    getSize(): {
        width: number;
        height: number;
    };
    clear(): void;
    dispose(): void;
    toJSON(): {
        width: number;
        height: number;
        type: ShadowMapType;
        bias: number;
        enabled: boolean;
    };
    static fromJSON(data: any): ShadowMap;
}
