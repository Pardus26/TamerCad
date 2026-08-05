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
    protected abstract: any;
    initialDensity(): number[];
    protected abstract: any;
    computeSensitivity(): number[];
    protected abstract: any;
    updateDensity(sensitivity: number[]): void;
    protected abstract: any;
    computeCompliance(): number;
    protected abstract: any;
    changeNorm(): number;
    getDensity(): number[];
    info(): {
        engine: string;
        penalty: number;
        volumeFraction: number;
    };
}
