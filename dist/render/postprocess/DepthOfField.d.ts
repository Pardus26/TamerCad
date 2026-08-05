import { PostProcess, PostProcessType } from "./PostProcess";
import { RenderContext } from "../RenderContext";
export interface DepthOfFieldOptions {
    enabled?: boolean;
    focusDistance?: number;
    focusRange?: number;
    aperture?: number;
    maxBlur?: number;
}
export declare class DepthOfField extends PostProcess {
    /**
     * Kamera odak mesafesi
     */
    focusDistance: number;
    /**
     * Net alan genişliği
     */
    focusRange: number;
    /**
     * Lens açıklığı
     *
     * Büyük değer:
     * daha fazla bulanıklık
     */
    aperture: number;
    /**
     * Maksimum blur miktarı
     */
    maxBlur: number;
    private depthTexture;
    constructor(options?: DepthOfFieldOptions);
    setDepthTexture(texture: any): void;
    getDepthTexture(): any;
    process(context: RenderContext): any;
    setFocusDistance(value: number): void;
    setFocusRange(value: number): void;
    setAperture(value: number): void;
    setMaxBlur(value: number): void;
    toJSON(): {
        focusDistance: number;
        focusRange: number;
        aperture: number;
        maxBlur: number;
        enabled: boolean;
        intensity: number;
        type: PostProcessType;
    };
}
