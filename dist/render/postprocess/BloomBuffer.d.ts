import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface BloomBufferOptions {
    width?: number;
    height?: number;
    levels?: number;
}
export declare enum BloomBufferAttachment {
    Bright = "bright"
}
export declare class BloomBuffer extends FrameBuffer {
    /**
     * Blur pyramid seviyesi
     */
    levels: number;
    private mipTextures;
    constructor(options?: BloomBufferOptions);
    static createAttachments(): FrameBufferAttachment[];
    initialize(context: any): void;
    private createMipChain;
    getBrightTexture(): any;
    getMipTexture(level: number): any;
    getMipChain(): any[];
    setLevels(value: number): void;
    resize(width: number, height: number): void;
    clear(): void;
    debugInfo(): {
        type: string;
        levels: number;
        size: {
            width: number;
            height: number;
        };
        mipChain: {
            level: any;
            width: any;
            height: any;
        }[];
    };
}
