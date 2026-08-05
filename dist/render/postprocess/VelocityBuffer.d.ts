import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface VelocityBufferOptions {
    width?: number;
    height?: number;
    format?: string;
}
export declare enum VelocityAttachment {
    Velocity = "velocity"
}
export declare class VelocityBuffer extends FrameBuffer {
    currentViewProjection: any;
    previousViewProjection: any;
    currentCameraPosition: any;
    previousCameraPosition: any;
    constructor(options?: VelocityBufferOptions);
    static createAttachments(options: VelocityBufferOptions): FrameBufferAttachment[];
    getVelocityTexture(): any;
    updateMatrices(current: any, previous: any): void;
    updateCameraPositions(current: any, previous: any): void;
    calculateVelocity(currentPosition: any, previousPosition: any): any;
    reset(): void;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attachment: VelocityAttachment;
    };
}
