import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface DepthPrepassOptions {
    width?: number;
    height?: number;
    depthFormat?: string;
    generateNormal?: boolean;
}
export declare enum DepthPrepassAttachment {
    Depth = "depth",
    Normal = "normal"
}
export declare class DepthPrepass extends FrameBuffer {
    enabled: boolean;
    generateNormal: boolean;
    private rendered;
    constructor(options?: DepthPrepassOptions);
    static createAttachments(options: DepthPrepassOptions): FrameBufferAttachment[];
    getDepthTexture(): any;
    getNormalTexture(): any;
    begin(): void;
    end(): void;
    isReady(): boolean;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        generated: boolean;
        attachments: string[];
    };
}
