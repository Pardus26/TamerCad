import { Optimizer } from "./Optimizer";
export class LBFGSOptimizer extends Optimizer {
    parameters = [];
    historySize = 10;
    initialize() {
        this.parameters =
            this.initialParameters();
        this.clearHistory();
    }
    iterate() {
        const direction = this.computeDirection();
        for (let i = 0; i < this.parameters.length; i++) {
            this.parameters[i] -=
                direction[i];
        }
        this.updateHistory();
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
            engine: "LBFGSOptimizer",
            historySize: this.historySize
        };
    }
}
//# sourceMappingURL=LBFGSOptimizer.js.map