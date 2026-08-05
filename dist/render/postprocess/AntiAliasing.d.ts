import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export declare enum AntiAliasingMode {
    None = "None",
    FXAA = "FXAA",
    SMAA = "SMAA",
    TAA = "TAA"
}
export interface AntiAliasingOptions {
    enabled?: boolean;
    mode?: AntiAliasingMode;
    quality?: number;
    jitter?: boolean;
    samples?: number;
}
export declare class AntiAliasing extends PostProcess {
    mode: AntiAliasingMode;
    /**
     * Kalite seviyesi
     */
    quality: number;
    /**
     * Temporal jitter aktif mi?
     */
    jitter: boolean;
    /**
     * TAA sample sayısı
     */
    samples: number;
    private historyTexture;
    private jitterIndex;
    constructor(options?: AntiAliasingOptions);
    initialize(context: RenderContext): void;
    private createHistoryBuffer;
    process(context: RenderContext): any;
    private updateJitter;
    private getModeValue;
    setMode(mode: AntiAliasingMode): void;
    setQuality(value: number): void;
    setSamples(value: number): void;
    setJitter(value: boolean): void;
    getHistoryTexture(): any;
    reset(): void;
    dispose(): void;
    toJSON(): {
        mode: AntiAliasingMode;
        quality: number;
        jitter: boolean;
        samples: number;
        enabled: boolean;
        intensity: number;
        type: PostProcessType;
    };
}
