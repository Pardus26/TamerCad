import { VelocityBuffer } from "./VelocityBuffer";
import { MotionVectorBuffer } from "./MotionVectorBuffer";
export interface VelocityDilateOptions {
    radius?: number;
    depthThreshold?: number;
    enabled?: boolean;
}
export declare enum VelocityDilateMode {
    Nearest = "Nearest",
    MaxMagnitude = "MaxMagnitude",
    DepthAware = "DepthAware"
}
export declare class VelocityDilate {
    enabled: boolean;
    /**
     * Komşuluk arama yarıçapı
     */
    radius: number;
    /**
     * Depth fark toleransı
     */
    depthThreshold: number;
    mode: VelocityDilateMode;
    private source;
    private depthTexture;
    constructor(options?: VelocityDilateOptions);
    setVelocitySource(buffer: VelocityBuffer | MotionVectorBuffer): void;
    setDepthTexture(texture: any): void;
    setMode(mode: VelocityDilateMode): void;
    execute(): any;
    dilatePixel(center: any, neighbors: any[]): any;
    reset(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        radius: number;
        mode: VelocityDilateMode;
    };
}
