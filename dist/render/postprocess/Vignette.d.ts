import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface VignetteOptions {
    enabled?: boolean;
    intensity?: number;
    smoothness?: number;
    roundness?: number;
}
export declare class Vignette extends PostProcess {
    /**
     * Kenar kararma yoğunluğu
     */
    intensity: number;
    /**
     * Geçiş yumuşaklığı
     */
    smoothness: number;
    /**
     * Vinyet şekli
     *
     * 0 = oval
     * 1 = dairesel
     */
    roundness: number;
    constructor(options?: VignetteOptions);
    process(context: RenderContext): any;
    setIntensity(value: number): void;
    setSmoothness(value: number): void;
    setRoundness(value: number): void;
    reset(): void;
    getSettings(): {
        intensity: number;
        smoothness: number;
        roundness: number;
        enabled: boolean;
    };
    toJSON(): {
        intensity: number;
        smoothness: number;
        roundness: number;
        enabled: boolean;
        type: PostProcessType;
    };
}
