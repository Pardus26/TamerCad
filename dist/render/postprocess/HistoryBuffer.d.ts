import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface HistoryBufferOptions {
    width?: number;
    height?: number;
    colorFormat?: string;
    depthFormat?: string;
}
export declare enum HistoryBufferAttachment {
    Color = "historyColor",
    Depth = "historyDepth",
    Velocity = "historyVelocity"
}
export declare class HistoryBuffer extends FrameBuffer {
    /**
     * Kaç frame tutulduğu
     */
    frameIndex: number;
    /**
     * Önceki view-projection matrisi
     */
    previousMatrix: any;
    /**
     * Önceki kamera pozisyonu
     */
    previousCameraPosition: any;
    constructor(options?: HistoryBufferOptions);
    static createAttachments(options: HistoryBufferOptions): FrameBufferAttachment[];
    getColorTexture(): any;
    getDepthTexture(): any;
    getVelocityTexture(): any;
    updateMatrix(matrix: any): void;
    updateCameraPosition(position: any): void;
    advanceFrame(): void;
    resetFrame(): void;
    swap(other: HistoryBuffer): void;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        frameIndex: number;
        size: {
            width: number;
            height: number;
        };
        attachments: string[];
    };
}
