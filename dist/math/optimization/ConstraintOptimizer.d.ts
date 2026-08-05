import { LevenbergMarquardtOptimizer } from "./LevenbergMarquardtOptimizer";
export interface ConstraintResult {
    satisfied: boolean;
    residual: number;
    iterations: number;
}
export declare abstract class ConstraintOptimizer {
    protected optimizer: LevenbergMarquardtOptimizer;
    protected parameters: number[];
    constructor(optimizer: LevenbergMarquardtOptimizer);
    solve(): ConstraintResult;
    setParameters(parameters: number[]): void;
    getParameters(): number[];
    protected abstract evaluateResiduals(): number[];
    protected abstract computeJacobian(): number[][];
    protected abstract residualNorm(): number;
    info(): {
        engine: string;
    };
}
