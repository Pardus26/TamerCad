import { Optimizer } from "./Optimizer";
export declare abstract class LevenbergMarquardtOptimizer extends Optimizer {
    protected parameters: number[];
    protected damping: number;
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract: any;
    initialParameters(): number[];
    protected abstract: any;
    computeLMUpdate(): number[];
    protected abstract: any;
    updateDamping(): void;
    protected abstract: any;
    residualNorm(): number;
    getParameters(): number[];
    info(): {
        engine: string;
        damping: number;
    };
}
