import { SketchNumericalSolver, NumericalSolveResult } from "./SketchNumericalSolver";
export declare class GaussNewtonSolver extends SketchNumericalSolver {
    damping: number;
    solve(): NumericalSolveResult;
    protected performIteration(): void;
    protected solveLeastSquares(): number[];
    info(): {
        engine: string;
        variables: number;
        constraints: number;
        damping: number;
        tolerance: number;
    };
}
