import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface BiCGSTABResult {
    converged: boolean;
    iterations: number;
    residual: number;
}
export declare class BiCGSTABSolver {
    tolerance: number;
    maxIterations: number;
    solve(system: SparseLinearSystem): BiCGSTABResult;
    protected performIteration(): void;
    info(): {
        engine: string;
        tolerance: number;
        maxIterations: number;
    };
}
