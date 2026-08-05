import { Optimizer } from "./Optimizer";
export declare abstract class LevenbergMarquardtOptimizer extends Optimizer {
    protected parameters: number[];
    protected damping: number;
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialParameters(): number[];
    protected abstract computeLMUpdate(): number[];
    protected abstract updateDamping(): void;
    protected abstract residualNorm(): number;
    getParameters(): number[];
    info(): {
        engine: string;
        damping: number;
    };
}
