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
    protected abstract: any;
    evaluateGeometry(): void;
    protected abstract: any;
    objectiveFunction(): number;
    protected abstract: any;
    constraints(): boolean;
    setParameters(parameters: number[]): void;
    getParameters(): number[];
    info(): {
        engine: string;
    };
}
