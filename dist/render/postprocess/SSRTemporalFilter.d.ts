import { SSRHistoryBuffer } from "./SSRHistoryBuffer";
import { SSRResolve } from "./SSRResolve";
import { ShaderProgram } from "../shader/ShaderProgram";
export interface SSRTemporalFilterOptions {
    feedback?: number;
    varianceClamp?: number;
    spatialRadius?: number;
    enabled?: boolean;
    useMotionVectors?: boolean;
}
export declare enum SSRTemporalFilterMode {
    TemporalOnly = "TemporalOnly",
    TemporalSpatial = "TemporalSpatial",
    VarianceGuided = "VarianceGuided"
}
export interface SSRTemporalInput {
    color: any;
    history: any;
    velocity?: {
        x: number;
        y: number;
    };
    depth: number;
    variance: number;
    reactive: number;
}
export interface SSRTemporalResult {
    color: any;
    historyUsed: boolean;
    weight: number;
    rejected: boolean;
}
export declare class SSRTemporalFilter {
    enabled: boolean;
    feedback: number;
    varianceClamp: number;
    spatialRadius: number;
    useMotionVectors: boolean;
    mode: SSRTemporalFilterMode;
    private history;
    private resolve;
    private shader;
    private frameIndex;
    constructor(options?: SSRTemporalFilterOptions);
    setHistoryBuffer(buffer: SSRHistoryBuffer): void;
    setResolve(resolve: SSRResolve): void;
    setShader(shader: ShaderProgram): void;
    setMode(mode: SSRTemporalFilterMode): void;
    calculateHistoryUV(currentUV: {
        x: number;
        y: number;
    }, velocity: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };
    isValidHistoryUV(uv: {
        x: number;
        y: number;
    }): boolean;
    collectNeighborhood(samples: any[]): any[];
    calculateNeighborhoodAverage(samples: any[]): any;
    sampleHistory(uv: {
        x: number;
        y: number;
    }): any;
    estimateVariance(values: number[]): number;
    calculateMin(values: number[]): number;
    calculateMax(values: number[]): number;
    clampHistory(historyValue: number, neighborhood: number[]): number;
    varianceClampHistory(historyValue: number, neighborhood: number[]): number;
    detectDisocclusion(currentDepth: number, historyDepth: number): boolean;
    rejectHistory(input: SSRTemporalInput): boolean;
    temporalOnly(input: SSRTemporalInput, history: any): SSRTemporalResult;
    temporalSpatial(input: SSRTemporalInput, history: any, neighborhood: any[]): SSRTemporalResult;
    varianceGuided(input: SSRTemporalInput, history: any, neighborhood: number[]): SSRTemporalResult;
    filter(input: SSRTemporalInput, history?: any, neighborhood?: any[]): SSRTemporalResult;
    execute(context: any): any;
    updateHistory(current: any): void;
    resize(width: number, height: number): void;
    beginFrame(): void;
    reset(): void;
    invalidateHistory(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        mode: SSRTemporalFilterMode;
        feedback: number;
        varianceClamp: number;
        spatialRadius: number;
        useMotionVectors: boolean;
        frame: number;
        resources: {
            history: boolean;
            resolve: boolean;
            shader: boolean;
        };
    };
}
