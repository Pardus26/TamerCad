import { BRepParameterManager } from "../brep/parametric/BRepParameterManager";
export interface SketchConstraint {
    id: string;
    type: string;
    enabled: boolean;
    solve(): boolean;
}
export interface SketchSolverResult {
    success: boolean;
    iterations: number;
    solved: number;
    failed: number;
    message?: string;
}
export declare class SketchConstraintSolver {
    private constraints;
    readonly parameterManager: BRepParameterManager;
    maxIterations: number;
    tolerance: number;
    constructor(parameterManager: BRepParameterManager);
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(id: string): void;
    solve(): SketchSolverResult;
    validate(): boolean;
    degreesOfFreedom(): number;
    clear(): void;
    info(): {
        engine: string;
        constraints: number;
        dof: number;
    };
}
