export class FEMResponseEvaluator {
    evaluate(result) {
        return {
            compliance: this.computeCompliance(result),
            maxStress: this.computeMaxStress(result),
            maxDisplacement: this.computeMaxDisplacement(result),
            strainEnergy: this.computeStrainEnergy(result)
        };
    }
    objective(response) {
        return response.compliance;
    }
    constraints(response) {
        return [
            response.maxStress,
            response.maxDisplacement
        ];
    }
    info() {
        return {
            engine: "FEMResponseEvaluator"
        };
    }
}
//# sourceMappingURL=FEMResponseEvaluator.js.map