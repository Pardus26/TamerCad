import { Optimizer } from "./Optimizer";
export declare abstract class NewtonOptimizer extends Optimizer {
    protected parameters: number[];
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialParameters(): number[];
    protected abstract computeNewtonStep(): number[];
    protected abstract evaluateObjective(): number;
    protected abstract stepNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
    };
}
