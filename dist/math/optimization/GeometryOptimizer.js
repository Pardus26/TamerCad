export class GeometryOptimizer {
    optimizer;
    parameters = [];
    setOptimizer(optimizer) {
        this.optimizer = optimizer;
    }
    optimize() {
        if (!this.optimizer) {
            throw new Error("Optimizer not assigned");
        }
        const result = this.optimizer.optimize();
        return {
            converged: result.converged,
            iterations: result.iterations,
            objective: result.objective,
            parameters: this.parameters
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
            engine: "GeometryOptimizer"
        };
    }
}
//# sourceMappingURL=GeometryOptimizer.js.map