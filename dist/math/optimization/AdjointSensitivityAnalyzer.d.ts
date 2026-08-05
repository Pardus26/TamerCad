import { SensitivityAnalyzer } from "./SensitivityAnalyzer";
export interface AdjointResult {
    gradient: number[];
    adjoint: number[];
}
export declare abstract class AdjointSensitivityAnalyzer extends SensitivityAnalyzer {
    protected adjointVariables: number[];
    analyzeAdjoint(): AdjointResult;
    protected abstract: any;
    solveAdjoint(): void;
    protected abstract: any;
    computeAdjointGradient(): number[];
    protected abstract: any;
    assembleAdjointSystem(): unknown;
    getAdjointVariables(): number[];
    info(): {
        engine: string;
    };
}
