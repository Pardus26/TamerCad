export class FEMObjectiveFunction {
    weight = 1.0;
    evaluate(context) {
        return (this.weight *
            this.compute(context));
    }
    gradient(context) {
        return this.computeGradient(context);
    }
    setWeight(weight) {
        this.weight = weight;
    }
    getWeight() {
        return this.weight;
    }
    abstract;
    abstract;
    info() {
        return {
            engine: "FEMObjectiveFunction",
            weight: this.weight
        };
    }
}
//# sourceMappingURL=FEMObjectiveFunction.js.map