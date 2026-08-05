import { FeatureConstraint } from "./BRepFeatureConstraint";
export interface SolverVariable {
    name: string;
    value: number;
    locked: boolean;
}
export interface SolverEquation {
    id: string;
    variables: string[];
    evaluate: () => number;
}
export interface SolverResult {
    success: boolean;
    iterations: number;
    error: number;
    conflicts: string[];
}
export declare class BRepFeatureSolver {
    constraints: FeatureConstraint[];
    variables: SolverVariable[];
    equations: SolverEquation[];
    tolerance: number;
    maxIterations: number;
    iterations: number;
    constructor();
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: FeatureConstraint): void;
    /**
     * Değişken ekleme
     */
    addVariable(variable: SolverVariable): void;
    /**
     * Denklem ekleme
     */
    addEquation(equation: SolverEquation): void;
    /**
     * Variable bulma
     */
    getVariable(name: string): SolverVariable | undefined;
    /**
     * Distance çözümü
     */
    solveDistance(constraint: FeatureConstraint): {
        solved: boolean;
        value: number | undefined;
    } | null;
    /**
     * Angle çözümü
     */
    solveAngle(constraint: FeatureConstraint): {
        solved: boolean;
        angle: number | undefined;
    } | null;
    /**
     * Geometrik constraint çözümü
     */
    solveGeometricConstraint(constraint: FeatureConstraint): {
        solved: boolean;
        value: number | undefined;
    } | {
        solved: boolean;
        angle: number | undefined;
    } | {
        solved: boolean;
        relation: string;
    } | {
        solved: boolean;
        relation?: undefined;
    } | null;
    /**
     * Denklem iterasyonu
     */
    iterate(): number;
    /**
     * Ana solver
     */
    solve(): SolverResult;
    /**
     * Parametre güncelleme
     */
    propagateParameters(): {
        parameter: string;
        value: number;
    }[];
    /**
     * Constraint çakışma analizi
     */
    detectConflicts(): FeatureConstraint[];
    /**
     * Solver reset
     */
    reset(): void;
    /**
     * Serialize
     */
    serialize(): {
        constraints: number;
        variables: number;
        equations: number;
        iterations: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        constraints: number;
        variables: number;
    };
}
