import { Optimizer } from "./Optimizer";
export declare abstract class LBFGSOptimizer extends Optimizer {
    protected parameters: number[];
    protected historySize: number;
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialParameters(): number[];
    protected abstract clearHistory(): void;
    protected abstract updateHistory(): void;
    protected abstract computeDirection(): number[];
    protected abstract evaluateObjective(): number;
    protected abstract gradientNorm(): number;
    getParameters(): void;
    info(): {
        engine: string;
        historySize: number;
    };
}
