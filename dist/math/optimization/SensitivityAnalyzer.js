export class SensitivityAnalyzer {
    variables = [];
    setVariables(variables) {
        this.variables =
            [...variables];
    }
    analyze() {
        return {
            objectiveGradient: this.computeObjectiveGradient(),
            constraintGradients: this.computeConstraintGradients()
        };
    }
    abstract;
    abstract;
    abstract;
    getVariables() {
        return [
            ...this.variables
        ];
    }
    info() {
        return {
            engine: "SensitivityAnalyzer"
        };
    }
}
//# sourceMappingURL=SensitivityAnalyzer.js.map