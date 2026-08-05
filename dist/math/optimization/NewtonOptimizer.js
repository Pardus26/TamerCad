import { Optimizer } from "./Optimizer";
export class NewtonOptimizer extends Optimizer {
    parameters = [];
    initialize() {
        this.parameters =
            this.initialParameters();
    }
    iterate() {
        const step = this.computeNewtonStep();
        for (let i = 0; i < this.parameters.length; i++) {
            this.parameters[i] -=
                step[i];
        }
    }
    stopCriterion() {
        return;
        this.stepNorm() <
            this.tolerance;
    }
    objective() {
        return;
        this.evaluateObjective();
    }
    abstract;
    abstract;
    abstract;
    abstract;
    getParameters() {
        return;
        [...this.parameters];
    }
    info() {
        return {
            engine: "NewtonOptimizer"
        };
    }
}
//# sourceMappingURL=NewtonOptimizer.js.map