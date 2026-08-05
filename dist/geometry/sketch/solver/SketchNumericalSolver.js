export class SketchNumericalSolver {
    variables = [];
    constraints = [];
    tolerance = 1e-8;
    maxIterations = 50;
    addVariable(variable) {
        this.variables.push(variable);
    }
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    clear() {
        this.variables = [];
        this.constraints = [];
    }
    computeResidual() {
        let sum = 0;
        for (const constraint of this.constraints) {
            const r = constraint.evaluate();
            sum += r * r;
        }
        return Math.sqrt(sum);
    }
    hasConverged() {
        return this.computeResidual() < this.tolerance;
    }
    info() {
        return {
            engine: "SketchNumericalSolver",
            variables: this.variables.length,
            constraints: this.constraints.length,
            tolerance: this.tolerance,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=SketchNumericalSolver.js.map