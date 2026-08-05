import { SSRBuffer } from "./SSRBuffer";
import { SSRHistoryBuffer } from "./SSRHistoryBuffer";
import { ReactiveMask } from "./ReactiveMask";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRResolveOptions {
    historyWeight?: number;
    confidenceThreshold?: number;
    roughnessFade?: number;
    enabled?: boolean;
    adaptive?: boolean;
}
export declare enum SSRResolveMode {
    CurrentOnly = "CurrentOnly",
    Temporal = "Temporal",
    Adaptive = "Adaptive"
}
export interface SSRResolveInput {
    color: any;
    confidence: number;
    roughness: number;
    reactive: number;
}
export interface SSRResolveResult {
    color: any;
    historyUsed: boolean;
    weight: number;
    confidence: number;
}
export declare class SSRResolve {
    enabled: boolean;
    historyWeight: number;
    confidenceThreshold: number;
    roughnessFade: number;
    adaptive: boolean;
    mode: SSRResolveMode;
    private ssrBuffer;
    private historyBuffer;
    private reactiveMask;
    private shader;
    private frameIndex;
    constructor(options?: SSRResolveOptions);
    setSSRBuffer(buffer: SSRBuffer): void;
    setHistoryBuffer(buffer: SSRHistoryBuffer): void;
    setReactiveMask(mask: ReactiveMask): void;
    setShader(shader: ShaderProgram): void;
    setMode(mode: SSRResolveMode): void;
    evaluateConfidence(confidence: number): number;
    calculateRoughnessFade(roughness: number): number;
    calculateHistoryWeight(confidence: number, roughness: number): number;
    calculateAdaptiveWeight(input: SSRResolveInput): number;
    blend(current: any, history: any, weight: number): SSRResolveResult;
    shouldRejectHistory(reactive: number): boolean;
    resolveCurrentOnly(current: any): SSRResolveResult;
    resolveTemporal(input: SSRResolveInput, history: any): SSRResolveResult;
    resolveAdaptive(input: SSRResolveInput, history: any): SSRResolveResult;
    resolve(input: SSRResolveInput, history?: any): SSRResolveResult;
    updateHistory(): void;
    execute(context: any): any;
    resize(width: number, height: number): void;
    resetFrame(): void;
    setEnabled(enabled: boolean): void;
    setHistoryWeight(weight: number): void;
    setConfidenceThreshold(value: number): void;
    setRoughnessFade(value: number): void;
    reset(): void;
    invalidateHistory(): void;
    getStats(): {
        frame: number;
        enabled: boolean;
        mode: SSRResolveMode;
        temporal: boolean;
        adaptive: boolean;
    };
    debugInfo(): {
        type: string;
        enabled: boolean;
        mode: SSRResolveMode;
        historyWeight: number;
        confidenceThreshold: number;
        roughnessFade: number;
        adaptive: boolean;
        frame: number;
        resources: {
            ssrBuffer: boolean;
            historyBuffer: boolean;
            reactiveMask: boolean;
            shader: boolean;
        };
    };
}
