export interface NumericalVariable {
    id: string;
    value: number;
}
export interface NumericalConstraint {
    id: string;
    evaluate(): number;
    gradient(): number[];
}
export interface NumericalSolveResult {
    converged: boolean;
    iterations: number;
    residual: number;
}
export declare abstract class SketchNumericalSolver {
    protected variables: NumericalVariable[];
    protected constraints: NumericalConstraint[];
    tolerance: number;
    maxIterations: number;
    addVariable(variable: NumericalVariable): void;
    addConstraint(constraint: NumericalConstraint): void;
    clear(): void;
    abstract solve(): NumericalSolveResult;
    protected computeResidual(): number;
    protected hasConverged(): boolean;
    info(): {
        engine: string;
        variables: number;
        constraints: number;
        tolerance: number;
        maxIterations: number;
    };
}
