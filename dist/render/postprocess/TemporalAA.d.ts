import { HistoryBuffer } from "./HistoryBuffer";
import { VelocityBuffer } from "./VelocityBuffer";
export interface TemporalAAOptions {
    enabled?: boolean;
    feedback?: number;
    jitterScale?: number;
    clampStrength?: number;
}
export declare class TemporalAA {
    enabled: boolean;
    /**
     * Önceki frame katkı oranı
     */
    feedback: number;
    /**
     * Subpixel jitter miktarı
     */
    jitterScale: number;
    /**
     * Ghosting azaltma
     */
    clampStrength: number;
    private history;
    private velocity;
    private frameIndex;
    private jitter;
    constructor(options?: TemporalAAOptions);
    setHistoryBuffer(buffer: HistoryBuffer): void;
    setVelocityBuffer(buffer: VelocityBuffer): void;
    private halton;
    updateJitter(width: number, height: number): void;
    getJitter(): {
        x: number;
        y: number;
    };
    resolve(currentFrame: any, historyFrame: any, velocityTexture: any): any;
    clampHistory(color: any): any;
    reset(): void;
    dispose(): void;
    debugInfo(): {
        enabled: boolean;
        feedback: number;
        jitter: {
            x: number;
            y: number;
        };
        frame: number;
    };
}
