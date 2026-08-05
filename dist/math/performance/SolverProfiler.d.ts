export interface SolverProfile {
    elapsedMilliseconds: number;
    iterations: number;
    finalResidual: number;
    residualHistory: number[];
}
export declare class SolverProfiler {
    private startTime;
    private endTime;
    private iterations;
    private residualHistory;
    start(): void;
    stop(): void;
    recordIteration(residual: number): void;
    buildReport(): SolverProfile;
    reset(): void;
}
