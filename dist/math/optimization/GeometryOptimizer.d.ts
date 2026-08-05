import { Optimizer } from "./Optimizer";
export interface GeometryOptimizationResult {
    converged: boolean;
    iterations: number;
    objective: number;
    parameters: number[];
}
export declare abstract class GeometryOptimizer {
    protected optimizer?: Optimizer;
    protected parameters: number[];
    setOptimizer(optimizer: Optimizer): void;
    optimize(): GeometryOptimizationResult;
    protected abstract evaluateGeometry(): void;
    protected abstract objectiveFunction(): number;
    protected abstract constraints(): boolean;
    setParameters(parameters: number[]): void;
    getParameters(): number[];
    info(): {
        engine: string;
    };
}
