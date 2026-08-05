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
    protected abstract: any;
    updateGeometry(): void;
    protected abstract: any;
    rebuildMesh(): void;
    protected abstract: any;
    solveFEM(): {
        displacement: number[];
        stress: number[];
    };
    protected abstract: any;
    evaluateObjective(result: any): number;
    protected abstract: any;
    evaluateConstraints(result: any): number[];
    protected abstract: any;
    createOptimizer(): any;
    info(): {
        engine: string;
    };
}
