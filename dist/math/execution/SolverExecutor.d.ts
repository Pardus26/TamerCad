import { LinearSystem } from "../linear/LinearSystem";
import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export interface SolverExecutionResult {
    analysis: unknown;
    profile: unknown;
    solution: unknown;
}
export declare class SolverExecutor {
    static solve(system: LinearSystem | SparseLinearSystem): SolverExecutionResult;
}
