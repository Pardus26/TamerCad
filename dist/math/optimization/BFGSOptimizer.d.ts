import { Optimizer } from "./Optimizer";
export declare abstract class BFGSOptimizer extends Optimizer {
    protected parameters: number[];
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialParameters(): number[];
    protected abstract initializeApproximation(): void;
    protected abstract updateApproximation(): void;
    protected abstract computeStep(): number[];
    protected abstract evaluateObjective(): number;
    protected abstract gradientNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
    };
}
