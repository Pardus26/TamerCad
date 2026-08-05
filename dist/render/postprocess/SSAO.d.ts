import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface SSAOOptions {
    enabled?: boolean;
    radius?: number;
    intensity?: number;
    bias?: number;
    samples?: number;
}
export declare class SSAO extends PostProcess {
    /**
     * Occlusion etki yarıçapı
     */
    radius: number;
    /**
     * Karanlık yoğunluğu
     */
    intensity: number;
    /**
     * Self shadow önleme bias değeri
     */
    bias: number;
    /**
     * Sample sayısı
     */
    samples: number;
    private noiseTexture;
    private kernel;
    constructor(options?: SSAOOptions);
    initialize(context: RenderContext): void;
    private generateKernel;
    private createNoiseTexture;
    process(context: RenderContext): any;
    setRadius(value: number): void;
    setIntensity(value: number): void;
    setSamples(value: number): void;
    getKernel(): number[][];
    toJSON(): {
        radius: number;
        intensity: number;
        bias: number;
        samples: number;
        enabled: boolean;
        type: PostProcessType;
    };
}
