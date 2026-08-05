import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface SSRBufferOptions {
    width?: number;
    height?: number;
    colorFormat?: string;
    dataFormat?: string;
    enabled?: boolean;
}
export declare enum SSRBufferAttachment {
    Reflection = "reflection",
    HitDistance = "hitDistance",
    Confidence = "confidence",
    RayData = "rayData",
    Normal = "normal",
    Roughness = "roughness",
    HistoryWeight = "historyWeight",
    Reactive = "reactive",
    Blur = "blur"
}
export interface SSRHitData {
    distance: number;
    confidence: number;
    hit: boolean;
}
export interface SSRRayData {
    origin: any;
    direction: any;
}
export declare class SSRBuffer extends FrameBuffer {
    enabled: boolean;
    private reflectionTexture;
    private hitData;
    private rayData;
    private frameIndex;
    constructor(options?: SSRBufferOptions);
    static createAttachments(options: SSRBufferOptions): FrameBufferAttachment[];
    getReflectionTexture(): any;
    getHitDistanceTexture(): any;
    getConfidenceTexture(): any;
    getRayDataTexture(): any;
    getNormalTexture(): any;
    getRoughnessTexture(): any;
    getHistoryWeightTexture(): any;
    getReactiveTexture(): any;
    getBlurTexture(): any;
    setReflectionTexture(texture: any): void;
    getStoredReflection(): any;
    setHitData(data: SSRHitData): void;
    getHitData(): SSRHitData | null;
    hasHit(): boolean;
    setRayData(data: SSRRayData): void;
    getRayData(): SSRRayData | null;
    setConfidence(value: number): void;
    getConfidence(): number;
    setNormal(normal: any): void;
    getNormal(): any;
    setRoughness(value: number): void;
    getRoughness(): any;
    setHistoryWeight(weight: number): void;
    getHistoryWeight(): any;
    setReactive(value: number): void;
    getReactive(): any;
    validateTemporal(confidenceThreshold?: number): boolean;
    getDenoiseInput(): any;
    getResolveInput(): any;
    begin(): void;
    end(): void;
    getFrameIndex(): number;
    upload(): void;
    bind(): any;
    clear(): void;
    resize(width: number, height: number): void;
    copyFrom(source: SSRBuffer): void;
    cloneState(): any;
    reset(): void;
    release(): void;
    setEnabled(enabled: boolean): void;
    isEnabled(): boolean;
    getStats(): {
        width: number;
        height: number;
        frame: number;
        enabled: boolean;
        hasReflection: boolean;
        hasHit: boolean;
    };
    debugInfo(): {
        type: string;
        enabled: boolean;
        size: {
            width: number;
            height: number;
        };
        frame: number;
        hitData: SSRHitData | null;
        rayData: SSRRayData | null;
        attachments: string[];
    };
}
