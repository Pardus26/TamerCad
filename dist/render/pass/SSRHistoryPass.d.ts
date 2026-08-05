import { SSRBuffer } from "../postprocess/SSRBuffer";
import { SSRHistoryBuffer } from "../postprocess/SSRHistoryBuffer";
import { FrameBuffer } from "../postprocess/FrameBuffer";
export interface SSRHistoryPassOptions {
    feedback?: number;
    confidenceThreshold?: number;
    depthThreshold?: number;
    normalThreshold?: number;
    motionThreshold?: number;
    enabled?: boolean;
}
export declare enum SSRHistoryPassMode {
    Replace = "Replace",
    Accumulate = "Accumulate",
    Adaptive = "Adaptive"
}
export interface SSRHistorySample {
    reflection: any;
    confidence: number;
    hitDistance: number;
    depth?: number;
    normal?: any;
    motion?: any;
}
export interface SSRHistoryValidation {
    valid: boolean;
    depthValid: boolean;
    normalValid: boolean;
    motionValid: boolean;
}
export declare class SSRHistoryPass {
    enabled: boolean;
    /**
     * Temporal feedback strength
     */
    feedback: number;
    /**
     * Minimum history confidence
     */
    confidenceThreshold: number;
    /**
     * Depth rejection
     */
    depthThreshold: number;
    /**
     * Normal rejection
     */
    normalThreshold: number;
    /**
     * Motion rejection
     */
    motionThreshold: number;
    mode: SSRHistoryPassMode;
    private ssrBuffer;
    private historyBuffer;
    private output;
    private frameIndex;
    private initialized;
    constructor(options?: SSRHistoryPassOptions);
    setSSRBuffer(buffer: SSRBuffer): void;
    setHistoryBuffer(buffer: SSRHistoryBuffer): void;
    setOutput(output: FrameBuffer): void;
    initialize(): void;
    begin(): void;
    end(): void;
    getPreviousHistory(): any;
    getCurrentHistory(): any;
    hasHistory(): boolean;
    private calculateFeedback;
    private rejectDepth;
    private rejectNormal;
    private rejectMotion;
    validateHistory(sample: SSRHistorySample, history: any): SSRHistoryValidation;
    private calculateConfidence;
    private blendHistory;
    accumulate(sample: SSRHistorySample): any;
    resolveTemporal(sample: SSRHistorySample, validation?: boolean): any;
    writeHistory(reflection: any, confidence: number, hitDistance: number, extra?: any): void;
    execute(sample: SSRHistorySample): any;
    render(): any;
    resize(width: number, height: number): void;
    clear(): void;
    reset(): void;
    release(): void;
    setMode(mode: SSRHistoryPassMode): void;
    getMode(): SSRHistoryPassMode;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    setFeedback(value: number): void;
    getFeedback(): number;
    setConfidenceThreshold(value: number): void;
    getConfidenceThreshold(): number;
    getFrameIndex(): number;
    validate(): boolean;
    getStats(): {
        type: string;
        enabled: boolean;
        initialized: boolean;
        mode: SSRHistoryPassMode;
        feedback: number;
        confidenceThreshold: number;
        depthThreshold: number;
        normalThreshold: number;
        motionThreshold: number;
        frame: number;
        hasHistory: boolean;
    };
    debugInfo(): {
        type: string;
        mode: SSRHistoryPassMode;
        enabled: boolean;
        frameIndex: number;
        initialized: boolean;
        parameters: {
            feedback: number;
            confidenceThreshold: number;
            depthThreshold: number;
            normalThreshold: number;
            motionThreshold: number;
        };
        buffers: {
            ssr: boolean;
            history: boolean;
            output: boolean;
        };
        history: {
            type: string;
            enabled: boolean;
            frameIndex: number;
            historyIndex: number;
            historyCount: number;
            size: {
                width: number;
                height: number;
            };
            current: {
                index: number;
                valid: boolean;
            };
            previous: {
                index: number;
                valid: boolean;
            };
        } | undefined;
    };
    dispose(): void;
}
