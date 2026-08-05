export interface RenderTargetOptions {
    width?: number;
    height?: number;
    samples?: number;
    colorFormat?: string;
    depthFormat?: string;
    useDepth?: boolean;
}
export declare class RenderTarget {
    width: number;
    height: number;
    /**
     * MSAA sample sayısı
     */
    samples: number;
    colorFormat: string;
    depthFormat: string;
    useDepth: boolean;
    private framebuffer;
    private colorTexture;
    private depthTexture;
    private initialized;
    constructor(options?: RenderTargetOptions);
    initialize(context: any): void;
    bind(context: any): void;
    unbind(context: any): void;
    resize(width: number, height: number): void;
    getColorTexture(): any;
    getDepthTexture(): any;
    getFramebuffer(): any;
    setSamples(samples: number): void;
    getSize(): {
        width: number;
        height: number;
    };
    clear(context: any): void;
    dispose(): void;
    toJSON(): {
        width: number;
        height: number;
        samples: number;
        colorFormat: string;
        depthFormat: string;
        useDepth: boolean;
    };
    static fromJSON(data: any): RenderTarget;
}
