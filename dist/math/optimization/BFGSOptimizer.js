import { Optimizer } from "./Optimizer";
export class BFGSOptimizer extends Optimizer {
    parameters = [];
    initialize() {
        this.parameters =
            this.initialParameters();
        this.initializeApproximation();
    }
    iterate() {
        const step = this.computeStep();
        for (let i = 0; i < this.parameters.length; i++) {
            this.parameters[i] -=
                step[i];
        }
        this.updateApproximation();
    }
    stopCriterion() {
        return;
        this.gradientNorm()
            <
                this.tolerance;
    }
    objective() {
        return;
        this.evaluateObjective();
    }
    getParameters() {
        return;
        [...this.parameters];
    }
    info() {
        return {
            engine: "BFGSOptimizer"
        };
    }
}
//# sourceMappingURL=BFGSOptimizer.js.map