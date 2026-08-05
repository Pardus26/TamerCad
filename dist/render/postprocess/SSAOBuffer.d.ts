import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface SSAOBufferOptions {
    width?: number;
    height?: number;
}
export declare enum SSAOBufferAttachment {
    Occlusion = "occlusion",
    Blur = "blur"
}
export declare class SSAOBuffer extends FrameBuffer {
    constructor(options?: SSAOBufferOptions);
    static createAttachments(): FrameBufferAttachment[];
    getOcclusionTexture(): any;
    getBlurTexture(): any;
    clear(): void;
    debugInfo(): {
        type: string;
        width: number;
        height: number;
        attachments: string[];
    };
}
