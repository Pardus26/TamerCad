import { Optimizer } from "./Optimizer";
export declare abstract class LBFGSOptimizer extends Optimizer {
    protected parameters: number[];
    protected historySize: number;
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract: any;
    initialParameters(): number[];
    protected abstract: any;
    clearHistory(): void;
    protected abstract: any;
    updateHistory(): void;
    protected abstract: any;
    computeDirection(): number[];
    protected abstract: any;
    evaluateObjective(): number;
    protected abstract: any;
    gradientNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
        historySize: number;
    };
}
