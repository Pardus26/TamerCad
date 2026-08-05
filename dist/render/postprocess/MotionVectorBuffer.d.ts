import { FrameBuffer, FrameBufferAttachment } from "./FrameBuffer";
export interface MotionVectorBufferOptions {
    width?: number;
    height?: number;
    format?: string;
    includeObjectMotion?: boolean;
}
export declare enum MotionVectorAttachment {
    Velocity = "velocity",
    ObjectVelocity = "objectVelocity",
    CameraVelocity = "cameraVelocity"
}
export declare class MotionVectorBuffer extends FrameBuffer {
    /**
     * Obje hareket vektörleri dahil mi?
     */
    includeObjectMotion: boolean;
    /**
     * Frame zaman bilgisi
     */
    currentTime: number;
    previousTime: number;
    private rendered;
    constructor(options?: MotionVectorBufferOptions);
    static createAttachments(options: MotionVectorBufferOptions): FrameBufferAttachment[];
    getVelocityTexture(): any;
    getObjectVelocityTexture(): any;
    getCameraVelocityTexture(): any;
    beginFrame(time: number): void;
    endFrame(): void;
    calculateScreenVelocity(currentPosition: any, previousPosition: any): any;
    calculateObjectMotion(currentMatrix: any, previousMatrix: any): any;
    reset(): void;
    clear(): void;
    resize(width: number, height: number): void;
    debugInfo(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        objectMotion: boolean;
        rendered: boolean;
        attachments: string[];
    };
}
