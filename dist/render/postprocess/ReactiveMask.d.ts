import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface ReactiveMaskOptions {
    width?: number;
    height?: number;
    format?: string;
    threshold?: number;
}
export declare enum ReactiveMaskAttachment {
    Mask = "mask",
    MaterialID = "materialID",
    Emissive = "emissive"
}
export declare class ReactiveMask extends FrameBuffer {
    /**
     * TAA history kabul/red maskesi
     *
     * 0 = history kullanılabilir
     *
     * 1 = history reddedilir
     */
    threshold: number;
    enabled: boolean;
    private rendered;
    constructor(options?: ReactiveMaskOptions);
    static createAttachments(options: ReactiveMaskOptions): FrameBufferAttachment[];
    getMaskTexture(): any;
    getMaterialIDTexture(): any;
    getEmissiveTexture(): any;
    begin(): void;
    end(): void;
    setReactivePixel(material: any): number;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        threshold: number;
        rendered: boolean;
        attachments: string[];
    };
}
