export class Optimizer {
    tolerance = 1e-8;
    maxIterations = 1000;
    iteration = 0;
    optimize() {
        this.initialize();
        while (this.iteration <
            this.maxIterations &&
            !this.stopCriterion()) {
            this.iterate();
            this.iteration++;
        }
        return {
            converged: this.stopCriterion(),
            iterations: this.iteration,
            objective: this.objective()
        };
    }
    reset() {
        this.iteration = 0;
    }
    info() {
        return {
            engine: "Optimizer",
            tolerance: this.tolerance,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=Optimizer.js.map