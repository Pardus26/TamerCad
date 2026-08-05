import { Optimizer } from "./Optimizer";
export class TopologyOptimizer extends Optimizer {
    densities = [];
    volumeFraction = 0.5;
    penalty = 3.0;
    initialize() {
        this.densities =
            this.initialDensity();
    }
    iterate() {
        const sensitivities = this.computeSensitivity();
        this.updateDensity(sensitivities);
    }
    stopCriterion() {
        return;
        this.changeNorm()
            <
                this.tolerance;
    }
    objective() {
        return;
        this.computeCompliance();
    }
    abstract;
    abstract;
    abstract;
    abstract;
    abstract;
    getDensity() {
        return [
            ...this.densities
        ];
    }
    info() {
        return {
            engine: "TopologyOptimizer",
            penalty: this.penalty,
            volumeFraction: this.volumeFraction
        };
    }
}
//# sourceMappingURL=TopologyOptimizer.js.map