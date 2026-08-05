import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface NormalPrepassOptions {
    width?: number;
    height?: number;
    format?: string;
    encodeViewSpace?: boolean;
}
export declare enum NormalPrepassAttachment {
    Normal = "normal",
    Depth = "depth"
}
export declare class NormalPrepass extends FrameBuffer {
    enabled: boolean;
    /**
     * View space veya world space normal
     */
    encodeViewSpace: boolean;
    private rendered;
    constructor(options?: NormalPrepassOptions);
    static createAttachments(options: NormalPrepassOptions): FrameBufferAttachment[];
    getNormalTexture(): any;
    getDepthTexture(): any;
    begin(): void;
    end(): void;
    isReady(): boolean;
    encodeNormal(normal: any): any;
    decodeNormal(encoded: any): any;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        viewSpace: boolean;
        rendered: boolean;
        attachments: string[];
    };
}
