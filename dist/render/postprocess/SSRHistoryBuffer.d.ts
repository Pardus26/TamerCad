import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface SSRHistoryBufferOptions {
    width?: number;
    height?: number;
    format?: string;
    historyCount?: number;
    enabled?: boolean;
}
export declare enum SSRHistoryAttachment {
    Reflection = "reflection",
    Confidence = "confidence",
    HitDistance = "hitDistance",
    Depth = "depth",
    Normal = "normal",
    Motion = "motion",
    Validity = "validity"
}
export interface SSRHistoryFrame {
    index: number;
    reflection: any;
    confidence: any;
    hitDistance: any;
    depth: any;
    normal: any;
    motion: any;
    valid: boolean;
}
export declare class SSRHistoryBuffer extends FrameBuffer {
    enabled: boolean;
    /**
     * Ping pong index
     */
    private historyIndex;
    /**
     * Tutulan frame sayısı
     */
    historyCount: number;
    /**
     * Current frame
     */
    frameIndex: number;
    private historyFrames;
    constructor(options?: SSRHistoryBufferOptions);
    static createAttachments(options: SSRHistoryBufferOptions): FrameBufferAttachment[];
    private createHistory;
    initialize(context: any): void;
    getCurrentHistory(): SSRHistoryFrame;
    getPreviousHistory(): SSRHistoryFrame;
    getHistory(index: number): SSRHistoryFrame | null;
    getReflectionTexture(): any;
    getConfidenceTexture(): any;
    getHitDistanceTexture(): any;
    getDepthTexture(): any;
    getNormalTexture(): any;
    getMotionTexture(): any;
    getValidityTexture(): any;
    storeCurrent(data: Partial<SSRHistoryFrame>): void;
    setReflectionHistory(texture: any): void;
    setConfidenceHistory(texture: any): void;
    setHitDistanceHistory(texture: any): void;
    setDepthHistory(texture: any): void;
    setNormalHistory(texture: any): void;
    setMotionHistory(texture: any): void;
    invalidateHistory(): void;
    validateHistory(): boolean;
    hasPrevious(): boolean;
    rejectByDepth(currentDepth: number, historyDepth: number, threshold?: number): boolean;
    rejectByNormal(currentNormal: any, historyNormal: any, threshold?: number): boolean;
    rejectByMotion(motion: any, threshold?: number): boolean;
    canReuseHistory(current: any): boolean;
    calculateHistoryWeight(confidence: number, reactive: number): number;
    swap(): void;
    update(): void;
    copyHistory(source: SSRHistoryFrame): void;
    beginFrame(): void;
    endFrame(): void;
    resize(width: number, height: number): void;
    clear(): void;
    bindTemporal(): any;
    reset(): void;
    release(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    setHistoryCount(count: number): void;
    getStats(): {
        enabled: boolean;
        frame: number;
        historyIndex: number;
        historyCount: number;
        validFrames: number;
    };
    debugInfo(): {
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
    };
}
