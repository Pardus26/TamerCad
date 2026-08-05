export interface SensitivityResult {
    objectiveGradient: number[];
    constraintGradients: number[][];
}
export declare abstract class SensitivityAnalyzer {
    protected variables: number[];
    setVariables(variables: number[]): void;
    analyze(): SensitivityResult;
    protected abstract computeObjectiveGradient(): number[];
    protected abstract computeConstraintGradients(): number[][];
    protected abstract evaluateResponse(): number;
    getVariables(): number[];
    info(): {
        engine: string;
    };
}
