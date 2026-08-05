export class ConstraintOptimizer {
    optimizer;
    parameters = [];
    constructor(optimizer) {
        this.optimizer = optimizer;
    }
    solve() {
        const result = this.optimizer.optimize();
        return {
            satisfied: this.residualNorm()
                <
                    this.optimizer.tolerance,
            residual: this.residualNorm(),
            iterations: result.iterations
        };
    }
    setParameters(parameters) {
        this.parameters =
            [...parameters];
    }
    getParameters() {
        return [
            ...this.parameters
        ];
    }
    info() {
        return {
            engine: "ConstraintOptimizer"
        };
    }
}
//# sourceMappingURL=ConstraintOptimizer.js.map