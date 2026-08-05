import { Optimizer } from "./Optimizer";
export class LevenbergMarquardtOptimizer extends Optimizer {
    parameters = [];
    damping = 1e-3;
    initialize() {
        this.parameters =
            this.initialParameters();
    }
    iterate() {
        const delta = this.computeLMUpdate();
        for (let i = 0; i < this.parameters.length; i++) {
            this.parameters[i] +=
                delta[i];
        }
        this.updateDamping();
    }
    stopCriterion() {
        return (this.residualNorm()
            <
                this.tolerance);
    }
    objective() {
        const norm = this.residualNorm();
        return norm * norm;
    }
    getParameters() {
        return [
            ...this.parameters
        ];
    }
    info() {
        return {
            engine: "LevenbergMarquardtOptimizer",
            damping: this.damping
        };
    }
}
//# sourceMappingURL=LevenbergMarquardtOptimizer.js.map