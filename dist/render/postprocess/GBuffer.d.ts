import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface GBufferOptions {
    width?: number;
    height?: number;
    samples?: number;
}
export declare enum GBufferAttachmentType {
    Position = "position",
    Normal = "normal",
    Albedo = "albedo",
    Material = "material",
    Emissive = "emissive",
    Depth = "depth"
}
export declare class GBuffer extends FrameBuffer {
    constructor(options?: GBufferOptions);
    static createAttachments(): FrameBufferAttachment[];
    getPositionTexture(): any;
    getNormalTexture(): any;
    getAlbedoTexture(): any;
    getMaterialTexture(): any;
    getEmissiveTexture(): any;
    getDepthTexture(): any;
    clearAttachments(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        size: {
            width: number;
            height: number;
        };
        attachments: string[];
    };
}
