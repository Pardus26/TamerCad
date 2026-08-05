import { VelocityBuffer } from "./VelocityBuffer";
import { MotionVectorBuffer } from "./MotionVectorBuffer";
export interface VelocityClampOptions {
    maxVelocity?: number;
    softClamp?: boolean;
    enabled?: boolean;
}
export declare enum VelocityClampMode {
    Hard = "Hard",
    Soft = "Soft",
    Adaptive = "Adaptive"
}
export declare class VelocityClamp {
    enabled: boolean;
    /**
     * Maksimum screen-space velocity
     */
    maxVelocity: number;
    /**
     * Yumuşak geçiş
     */
    softClamp: boolean;
    mode: VelocityClampMode;
    private source;
    private depthTexture;
    constructor(options?: VelocityClampOptions);
    setVelocitySource(buffer: VelocityBuffer | MotionVectorBuffer): void;
    setDepthTexture(texture: any): void;
    setMode(mode: VelocityClampMode): void;
    clamp(velocity: any): any;
    softClampVelocity(velocity: any): any;
    execute(): any;
    reset(): void;
    debugInfo(): {
        type: string;
        enabled: boolean;
        maxVelocity: number;
        mode: VelocityClampMode;
    };
}
