import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface TAABufferOptions {
    width?: number;
    height?: number;
    format?: string;
}
export declare enum TAAAttachment {
    Accumulation = "accumulation",
    Resolve = "resolve",
    History = "history",
    Moments = "moments"
}
export declare class TAABuffer extends FrameBuffer {
    /**
     * Ping-pong history index
     */
    private historyIndex;
    /**
     * Temporal frame sayısı
     */
    frameCount: number;
    private historyTextures;
    constructor(options?: TAABufferOptions);
    static createAttachments(options: TAABufferOptions): FrameBufferAttachment[];
    initialize(context: any): void;
    private createHistoryBuffers;
    getAccumulationTexture(): any;
    getResolveTexture(): any;
    getHistoryTexture(): any;
    getPreviousHistoryTexture(): any;
    getMomentsTexture(): any;
    swapHistory(): void;
    resetHistory(): void;
    resize(width: number, height: number): void;
    clear(): void;
    debugInfo(): {
        type: string;
        historyIndex: number;
        frameCount: number;
        size: {
            width: number;
            height: number;
        };
        attachments: string[];
    };
}
