import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface OutlineColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export interface OutlineOptions {
    enabled?: boolean;
    color?: OutlineColor;
    thickness?: number;
    intensity?: number;
}
export declare class Outline extends PostProcess {
    /**
     * CAD seçim rengi
     */
    color: OutlineColor;
    /**
     * Kenar piksel kalınlığı
     */
    thickness: number;
    /**
     * Highlight kuvveti
     */
    intensity: number;
    /**
     * Object ID / selection mask
     */
    private maskTexture;
    /**
     * Depth edge detection
     */
    private depthTexture;
    constructor(options?: OutlineOptions);
    setMaskTexture(texture: any): void;
    setDepthTexture(texture: any): void;
    process(context: RenderContext): any;
    setColor(color: OutlineColor): void;
    setThickness(value: number): void;
    setIntensity(value: number): void;
    reset(): void;
    getSettings(): {
        color: OutlineColor;
        thickness: number;
        intensity: number;
        enabled: boolean;
    };
    toJSON(): {
        color: OutlineColor;
        thickness: number;
        intensity: number;
        enabled: boolean;
        type: PostProcessType;
    };
}
