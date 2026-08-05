import { OptimizationProblem } from "../../math/optimization/OptimizationProblem";
import { FEMResponseEvaluator } from "./FEMResponseEvaluator";
import { FEMConstraintEvaluator } from "./FEMConstraintEvaluator";
import { FEMObjectiveFunction } from "./FEMObjectiveFunction";
export interface FEMOptimizationConfig {
    maxIterations: number;
    tolerance: number;
}
export interface FEMOptimizationResult {
    converged: boolean;
    iterations: number;
    objective: number;
    parameters: number[];
}
export declare abstract class FEMOptimizationManager {
    protected config: FEMOptimizationConfig;
    protected problem: OptimizationProblem;
    protected responseEvaluator: FEMResponseEvaluator;
    protected constraintEvaluator: FEMConstraintEvaluator;
    protected objectiveFunction: FEMObjectiveFunction;
    constructor(config: FEMOptimizationConfig, problem: OptimizationProblem, responseEvaluator: FEMResponseEvaluator, constraintEvaluator: FEMConstraintEvaluator, objectiveFunction: FEMObjectiveFunction);
    optimize(): FEMOptimizationResult;
    protected abstract prepareProblem(): void;
    protected abstract createOptimizer(): any;
    protected abstract applyResult(result: any): void;
    info(): {
        engine: string;
        maxIterations: number;
    };
}
