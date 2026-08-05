import { Optimizer } from "./Optimizer";
export declare abstract class BFGSOptimizer extends Optimizer {
    protected parameters: number[];
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract: any;
    initialParameters(): number[];
    protected abstract: any;
    initializeApproximation(): void;
    protected abstract: any;
    updateApproximation(): void;
    protected abstract: any;
    computeStep(): number[];
    protected abstract: any;
    evaluateObjective(): number;
    protected abstract: any;
    gradientNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
    };
}
