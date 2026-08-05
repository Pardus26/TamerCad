import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface GMRESResult {
    converged: boolean;
    iterations: number;
    residual: number;
}
export declare class GMRESSolver {
    tolerance: number;
    maxIterations: number;
    restart: number;
    solve(system: SparseLinearSystem): GMRESResult;
    protected performRestartCycle(): void;
    info(): {
        engine: string;
        tolerance: number;
        restart: number;
        maxIterations: number;
    };
}
