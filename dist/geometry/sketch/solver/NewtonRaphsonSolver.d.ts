import { SketchNumericalSolver, NumericalSolveResult } from "./SketchNumericalSolver";
export declare class NewtonRaphsonSolver extends SketchNumericalSolver {
    solve(): NumericalSolveResult;
    protected performIteration(): void;
    protected solveLinearSystem(): number[];
    info(): {
        engine: string;
        variables: number;
        constraints: number;
        tolerance: number;
        maxIterations: number;
    };
}
