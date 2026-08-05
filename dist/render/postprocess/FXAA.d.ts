import { PostProcess, PostProcessType } from "./PostProcess";
import { ShaderProgram } from "../shader/ShaderProgram";
import { RenderContext } from "../RenderContext";
export interface FXAAOptions {
    enabled?: boolean;
    quality?: number;
    subpixelQuality?: number;
}
export declare class FXAA extends PostProcess {
    /**
     * FXAA kalite seviyesi
     *
     * 1 = hızlı
     * 2 = standart
     * 3 = yüksek kalite
     */
    quality: number;
    /**
     * Alt piksel düzeltme miktarı
     */
    subpixelQuality: number;
    constructor(options?: FXAAOptions);
    setShader(shader: ShaderProgram): void;
    initialize(context: RenderContext): void;
    process(context: RenderContext): any;
    setQuality(value: number): void;
    setSubpixelQuality(value: number): void;
    getSettings(): {
        quality: number;
        subpixelQuality: number;
        enabled: boolean;
    };
    toJSON(): {
        quality: number;
        subpixelQuality: number;
        enabled: boolean;
        intensity: number;
        type: PostProcessType;
    };
}
