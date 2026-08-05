import { Optimizer } from "./Optimizer";
export class GradientDescentOptimizer extends Optimizer {
    learningRate = 0.01;
    parameters = [];
    initialize() {
        this.parameters = this.initialParameters();
    }
    iterate() {
        const gradient = this.computeGradient();
        for (let i = 0; i < this.parameters.length; i++) {
            this.parameters[i] -=
                this.learningRate *
                    gradient[i];
        }
    }
    stopCriterion() {
        return this.gradientNorm() <
            this.tolerance;
    }
    objective() {
        return this.evaluateObjective();
    }
    getParameters() {
        return [...this.parameters];
    }
    info() {
        return {
            engine: "GradientDescentOptimizer",
            learningRate: this.learningRate,
            tolerance: this.tolerance
        };
    }
}
//# sourceMappingURL=GradientDescentOptimizer.js.map