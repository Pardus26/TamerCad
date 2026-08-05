import { BRepConstraint } from "./BRepConstraint";
export interface SolverVariable {
    id: string;
    value: number;
    locked: boolean;
}
export interface SolverEquation {
    constraint: BRepConstraint;
    error: number;
}
export interface SolverOptions {
    maxIterations: number;
    tolerance: number;
}
export interface SolverResult {
    success: boolean;
    iterations: number;
    solved: number;
    failed: string[];
}
export declare class BRepConstraintSolver {
    constraints: BRepConstraint[];
    variables: SolverVariable[];
    constructor();
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: BRepConstraint): void;
    /**
     * Variable ekleme
     */
    addVariable(variable: SolverVariable): void;
    /**
     * Ana solver
     */
    solve(options: SolverOptions): SolverResult;
    /**
     * Constraint graph oluşturma
     */
    buildGraph(): {
        nodes: number;
        edges: number;
    };
    /**
     * Degrees of freedom analizi
     */
    analyzeDOF(): {
        variables: number;
        locked: number;
        constraints: number;
        degreesOfFreedom: number;
    };
    /**
     * Conflict detection
     */
    detectConflicts(): string[];
    /**
     * Constraint sıfırlama
     */
    reset(): void;
    /**
     * Sadece belirli constraint çözme
     */
    solveConstraint(id: string): boolean;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
