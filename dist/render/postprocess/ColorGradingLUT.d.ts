export interface ColorGradingLUTOptions {
    size?: number;
    intensity?: number;
    enabled?: boolean;
}
export declare enum LUTFormat {
    RGB8 = "RGB8",
    RGB16F = "RGB16F",
    RGBA16F = "RGBA16F"
}
export declare class ColorGradingLUT {
    /**
     * LUT çözünürlüğü
     *
     * Yaygın:
     * 16x16x16
     * 32x32x32
     * 64x64x64
     */
    size: number;
    /**
     * LUT uygulanma oranı
     */
    intensity: number;
    enabled: boolean;
    format: LUTFormat;
    private texture;
    private data;
    constructor(options?: ColorGradingLUTOptions);
    private createEmptyLUT;
    upload(context: any): void;
    load(lutData: Float32Array): void;
    getTexture(): any;
    getData(): Float32Array | null;
    setIntensity(value: number): void;
    enable(): void;
    disable(): void;
    applyColorTransform(color: any): any;
    reset(): void;
    dispose(): void;
    toJSON(): {
        size: number;
        intensity: number;
        enabled: boolean;
        format: LUTFormat;
    };
}
