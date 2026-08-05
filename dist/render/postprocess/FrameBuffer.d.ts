export interface FrameBufferAttachment {
    name: string;
    type: string;
    format: string;
    texture: any;
}
export interface FrameBufferOptions {
    width?: number;
    height?: number;
    samples?: number;
    attachments?: FrameBufferAttachment[];
}
export declare class FrameBuffer {
    width: number;
    height: number;
    samples: number;
    private framebuffer;
    private attachments;
    private initialized;
    constructor(options?: FrameBufferOptions);
    initialize(context: any): void;
    bind(context: any): void;
    unbind(context: any): void;
    addAttachment(attachment: FrameBufferAttachment): void;
    removeAttachment(name: string): void;
    getAttachment(name: string): FrameBufferAttachment | undefined;
    getTexture(name: string): any;
    getAttachments(): FrameBufferAttachment[];
    resize(width: number, height: number): void;
    clear(context: any): void;
    dispose(): void;
    isInitialized(): boolean;
    toJSON(): {
        width: number;
        height: number;
        samples: number;
        attachments: {
            name: string;
            type: string;
            format: string;
        }[];
    };
}
