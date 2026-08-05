export interface ExposureControllerOptions {
    exposure?: number;
    autoExposure?: boolean;
    minExposure?: number;
    maxExposure?: number;
    adaptationSpeed?: number;
}
export declare enum ExposureMode {
    Manual = "Manual",
    Auto = "Auto"
}
export declare class ExposureController {
    mode: ExposureMode;
    /**
     * EV100 exposure değeri
     */
    exposure: number;
    /**
     * Otomatik exposure hedefi
     */
    targetExposure: number;
    minExposure: number;
    maxExposure: number;
    /**
     * Eye adaptation hızı
     */
    adaptationSpeed: number;
    /**
     * Ortalama sahne luminance
     */
    private averageLuminance;
    private initialized;
    constructor(options?: ExposureControllerOptions);
    initialize(): void;
    update(deltaTime: number): void;
    setExposure(value: number): void;
    enableAutoExposure(): void;
    disableAutoExposure(): void;
    setAverageLuminance(luminance: number): void;
    getExposure(): number;
    getExposureMultiplier(): number;
    setLimits(min: number, max: number): void;
    bind(shader: any): void;
    reset(): void;
    debugInfo(): {
        mode: ExposureMode;
        exposure: number;
        target: number;
        luminance: number;
    };
    toJSON(): {
        mode: ExposureMode;
        exposure: number;
        minExposure: number;
        maxExposure: number;
        adaptationSpeed: number;
    };
}
