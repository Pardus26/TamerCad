import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface MINRESResult {
    converged: boolean;
    iterations: number;
    residual: number;
}
export declare class MINRESSolver {
    tolerance: number;
    maxIterations: number;
    solve(system: SparseLinearSystem): MINRESResult;
    protected performIteration(): void;
    info(): {
        engine: string;
        tolerance: number;
        maxIterations: number;
    };
}
