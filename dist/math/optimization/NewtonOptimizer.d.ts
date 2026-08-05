import { Optimizer } from "./Optimizer";
export declare abstract class NewtonOptimizer extends Optimizer {
    protected parameters: number[];
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract: any;
    initialParameters(): number[];
    protected abstract: any;
    computeNewtonStep(): number[];
    protected abstract: any;
    evaluateObjective(): number;
    protected abstract: any;
    stepNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
    };
}
