export interface OptimizationResult {
    converged: boolean;
    iterations: number;
    objective: number;
}
export declare abstract class Optimizer {
    tolerance: number;
    maxIterations: number;
    protected iteration: number;
    optimize(): OptimizationResult;
    protected abstract initialize(): void;
    protected abstract iterate(): void;
    protected abstract stopCriterion(): boolean;
    protected abstract objective(): number;
    reset(): void;
    info(): {
        engine: string;
        tolerance: number;
        maxIterations: number;
    };
}
