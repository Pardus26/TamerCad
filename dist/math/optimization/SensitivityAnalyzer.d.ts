export interface SensitivityResult {
    objectiveGradient: number[];
    constraintGradients: number[][];
}
export declare abstract class SensitivityAnalyzer {
    protected variables: number[];
    setVariables(variables: number[]): void;
    analyze(): SensitivityResult;
    protected abstract: any;
    computeObjectiveGradient(): number[];
    protected abstract: any;
    computeConstraintGradients(): number[][];
    protected abstract: any;
    evaluateResponse(): number;
    getVariables(): number[];
    info(): {
        engine: string;
    };
}
