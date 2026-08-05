import { SketchGeometry } from "./Sketch";
import { SketchConstraint } from "./SketchConstraint";
export declare enum SolverStatus {
    Solved = "Solved",
    UnderConstrained = "UnderConstrained",
    OverConstrained = "OverConstrained",
    Failed = "Failed"
}
export interface SolverResult {
    status: SolverStatus;
    iterations: number;
    error: number;
}
export declare class SketchSolver {
    geometries: SketchGeometry[];
    constraints: SketchConstraint[];
    constructor(geometries: SketchGeometry[], constraints: SketchConstraint[]);
    solve(maxIterations?: number): SolverResult;
    private constraintError;
    getDegreesOfFreedom(): number;
    private constraintReduction;
}
