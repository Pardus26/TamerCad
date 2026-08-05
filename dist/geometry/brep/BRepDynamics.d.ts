export interface Vector3 {
    x: number;
    y: number;
    z: number;
}
export interface DynamicState {
    displacement: number[];
    velocity: number[];
    acceleration: number[];
}
export interface DynamicLoad {
    time: number;
    force: number[];
}
export interface DynamicResult {
    success: boolean;
    time: number;
    maxDisplacement: number;
}
export interface TimeStep {
    dt: number;
    totalTime: number;
}
export declare class BRepDynamics {
    mass: number[][];
    stiffness: number[][];
    damping: number[][];
    state: DynamicState;
    loads: DynamicLoad[];
    timeStep: TimeStep;
    beta: number;
    gamma: number;
    constructor();
    /**
     * Dynamic matrix yükleme
     */
    loadSystem(mass: number[][], stiffness: number[][], damping: number[][]): void;
    /**
     * Dynamic load ekleme
     */
    addLoad(load: DynamicLoad): void;
    /**
     * Ana transient çözüm
     */
    solve(): DynamicResult;
    /**
     * Newmark-beta zaman integrasyonu
     */
    newmarkStep(dt: number): void;
    /**
     * Acceleration update
     */
    updateAcceleration(): void;
    /**
     * Velocity update
     */
    updateVelocity(): void;
    /**
     * Displacement update
     */
    updateDisplacement(dt: number): void;
    /**
     * Rayleigh damping
     */
    calculateDamping(alpha: number, beta: number): void;
    /**
     * Harmonic response
     */
    harmonicResponse(frequency: number): {
        frequency: number;
        amplitude: number;
    };
    /**
     * Titreşim cevabı
     */
    vibrationResponse(time: number): number;
    /**
     * Mevcut displacement
     */
    currentDisplacement(): number;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        loads: number;
        status: string;
    };
}
