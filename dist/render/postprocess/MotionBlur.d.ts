import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface MotionBlurOptions {
    enabled?: boolean;
    intensity?: number;
    samples?: number;
    velocityScale?: number;
}
export declare class MotionBlur extends PostProcess {
    /**
     * Bulanıklık yoğunluğu
     */
    intensity: number;
    /**
     * Motion sample sayısı
     *
     * Kalite arttıkça maliyet artar
     */
    samples: number;
    /**
     * Velocity etkisi
     */
    velocityScale: number;
    private velocityTexture;
    private previousViewProjection;
    constructor(options?: MotionBlurOptions);
    initialize(context: RenderContext): void;
    private createVelocityBuffer;
    setVelocityTexture(texture: any): void;
    getVelocityTexture(): any;
    setPreviousMatrix(matrix: any): void;
    process(context: RenderContext): any;
    setIntensity(value: number): void;
    setSamples(value: number): void;
    setVelocityScale(value: number): void;
    reset(): void;
    getSettings(): {
        intensity: number;
        samples: number;
        velocityScale: number;
        enabled: boolean;
    };
    toJSON(): {
        intensity: number;
        samples: number;
        velocityScale: number;
        enabled: boolean;
        type: PostProcessType;
    };
}
