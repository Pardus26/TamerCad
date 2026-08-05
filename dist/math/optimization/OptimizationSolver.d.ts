import { OptimizationProblem } from "./OptimizationProblem";
import { Optimizer } from "./Optimizer";
export interface OptimizationResult {
    converged: boolean;
    iterations: number;
    objective: number;
    parameters: number[];
    profile: any;
}
export declare class OptimizationSolver {
    private constructor();
    static solve(problem: OptimizationProblem, optimizer: Optimizer): OptimizationResult;
    private static extractParameters;
    static info(): {
        engine: string;
    };
}
