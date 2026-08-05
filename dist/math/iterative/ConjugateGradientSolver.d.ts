import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface CGResult {
    converged: boolean;
    iterations: number;
    residual: number;
}
export declare class ConjugateGradientSolver {
    tolerance: number;
    maxIterations: number;
    solve(system: SparseLinearSystem): CGResult;
    protected performIteration(): void;
    info(): {
        engine: string;
        tolerance: number;
        maxIterations: number;
    };
}
