import { SketchNumericalSolver, NumericalSolveResult } from "./SketchNumericalSolver";
export declare class LevenbergMarquardtSolver extends SketchNumericalSolver {
    lambda: number;
    lambdaIncrease: number;
    lambdaDecrease: number;
    solve(): NumericalSolveResult;
    protected performIteration(): void;
    protected solveDampedSystem(): number[];
    info(): {
        engine: string;
        variables: number;
        constraints: number;
        lambda: number;
        tolerance: number;
        maxIterations: number;
    };
}
