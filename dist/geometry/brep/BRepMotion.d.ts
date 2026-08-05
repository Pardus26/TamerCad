import { BRepAssembly } from "./BRepAssembly";
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface MotionState {
    time: number;
    position: Vector3;
    rotation: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
}
export interface MotionDriver {
    componentId: string;
    axis: Vector3;
    speed: number;
    acceleration: number;
}
export interface MotionResult {
    success: boolean;
    time: number;
    updated: boolean;
    warnings: string[];
}
export declare class BRepMotion {
    assembly: BRepAssembly;
    drivers: MotionDriver[];
    states: Map<string, MotionState>;
    constructor(assembly: BRepAssembly);
    /**
     * Motion driver ekleme
     */
    addDriver(driver: MotionDriver): void;
    /**
     * Zaman adımı ilerletme
     */
    step(delta: number): MotionResult;
    /**
     * Driver hareketi
     */
    updateDriver(driver: MotionDriver, delta: number): void;
    /**
     * Velocity hesaplama
     */
    velocity(previous: Vector3, current: Vector3, delta: number): Vector3;
    /**
     * Acceleration hesaplama
     */
    acceleration(previousVelocity: Vector3, velocity: Vector3, delta: number): Vector3;
    /**
     * Revolute hareket
     */
    rotate(componentId: string, axis: Vector3, speed: number): void;
    /**
     * Linear hareket
     */
    translate(componentId: string, direction: Vector3, speed: number): void;
    /**
     * Kinematic chain çözümü
     */
    solveChain(): {
        solved: boolean;
        joints: number;
    };
    /**
     * Reset motion
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        drivers: number;
        status: string;
    };
}
