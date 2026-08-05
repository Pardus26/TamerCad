import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface LuminanceBufferOptions {
    width?: number;
    height?: number;
    levels?: number;
    format?: string;
}
export declare enum LuminanceAttachment {
    Luminance = "luminance",
    Downsample = "downsample"
}
export declare class LuminanceBuffer extends FrameBuffer {
    /**
     * Downsample pyramid seviyesi
     *
     * Auto exposure için kullanılır
     */
    levels: number;
    private mipChain;
    constructor(options?: LuminanceBufferOptions);
    static createAttachments(options: LuminanceBufferOptions): FrameBufferAttachment[];
    initialize(context: any): void;
    private createMipChain;
    getLuminanceTexture(): any;
    getDownsampleTexture(): any;
    getMipLevel(level: number): any;
    getMipChain(): any[];
    calculateAverageLuminance(): number;
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
