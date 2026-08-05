import { OptimizationProblem } from "../../math/optimization/OptimizationProblem";
export interface FEMOptimizationResult {
    objective: number;
    constraints: number[];
    displacement: number[];
    stress: number[];
}
export declare abstract class FEMOptimizationBridge {
    protected problem: OptimizationProblem;
    constructor(problem: OptimizationProblem);
    solve(): FEMOptimizationResult;
    optimize(): void;
    protected abstract updateGeometry(): void;
    protected abstract rebuildMesh(): void;
    protected abstract solveFEM(): {
        displacement: number[];
        stress: number[];
    };
    protected abstract evaluateObjective(result: any): number;
    protected abstract evaluateConstraints(result: any): number[];
    protected abstract createOptimizer(): any;
    info(): {
        engine: string;
    };
}
