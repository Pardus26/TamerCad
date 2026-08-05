import { Optimizer } from "./Optimizer";
export interface TopologyResult {
    converged: boolean;
    iterations: number;
    volumeFraction: number;
}
export declare abstract class TopologyOptimizer extends Optimizer {
    protected densities: number[];
    protected volumeFraction: number;
    protected penalty: number;
    protected initialize(): void;
    protected iterate(): void;
    protected stopCriterion(): boolean;
    protected objective(): number;
    protected abstract initialDensity(): number[];
    protected abstract computeSensitivity(): number[];
    protected abstract updateDensity(sensitivity: number[]): void;
    protected abstract computeCompliance(): number;
    protected abstract changeNorm(): number;
    getDensity(): number[];
    info(): {
        engine: string;
        penalty: number;
        volumeFraction: number;
    };
}
