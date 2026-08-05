import { SensitivityAnalyzer } from "./SensitivityAnalyzer";
export class AdjointSensitivityAnalyzer extends SensitivityAnalyzer {
    adjointVariables = [];
    analyzeAdjoint() {
        this.solveAdjoint();
        return {
            adjoint: [
                ...this.adjointVariables
            ],
            gradient: this.computeAdjointGradient()
        };
    }
    abstract;
    abstract;
    abstract;
    getAdjointVariables() {
        return [
            ...this.adjointVariables
        ];
    }
    info() {
        return {
            engine: "AdjointSensitivityAnalyzer"
        };
    }
}
//# sourceMappingURL=AdjointSensitivityAnalyzer.js.map