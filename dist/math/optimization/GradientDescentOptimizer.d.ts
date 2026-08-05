import { Optimizer } from "./Optimizer";
export declare abstract class GradientDescentOptimizer extends Optimizer {
    learningRate: number;
    protected parameters: number[];
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialParameters(): number[];
    protected abstract computeGradient(): number[];
    protected abstract evaluateObjective(): number;
    protected abstract gradientNorm(): number;
    getParameters(): number[];
    info(): {
        engine: string;
        learningRate: number;
        tolerance: number;
    };
}
