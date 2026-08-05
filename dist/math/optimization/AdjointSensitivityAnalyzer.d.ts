import { SensitivityAnalyzer } from "./SensitivityAnalyzer";
export interface AdjointResult {
    gradient: number[];
    adjoint: number[];
}
export declare abstract class AdjointSensitivityAnalyzer extends SensitivityAnalyzer {
    protected adjointVariables: number[];
    analyzeAdjoint(): AdjointResult;
    protected abstract solveAdjoint(): void;
    protected abstract computeAdjointGradient(): number[];
    protected abstract assembleAdjointSystem(): unknown;
    getAdjointVariables(): number[];
    info(): {
        engine: string;
    };
}
