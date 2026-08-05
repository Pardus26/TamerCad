import { SketchNumericalSolver } from "./SketchNumericalSolver";
export class LevenbergMarquardtSolver extends SketchNumericalSolver {
    lambda = 1e-3;
    lambdaIncrease = 10.0;
    lambdaDecrease = 0.1;
    solve() {
        let iteration = 0;
        let residual = this.computeResidual();
        while (iteration < this.maxIterations &&
            residual > this.tolerance) {
            const previousResidual = residual;
            this.performIteration();
            residual = this.computeResidual();
            if (residual < previousResidual) {
                this.lambda *= this.lambdaDecrease;
            }
            else {
                this.lambda *= this.lambdaIncrease;
            }
            iteration++;
        }
        return {
            converged: residual <= this.tolerance,
            iterations: iteration,
            residual
        };
    }
    performIteration() {
        const delta = this.solveDampedSystem();
        for (let i = 0; i < this.variables.length; i++) {
            this.variables[i].value += delta[i];
        }
    }
    solveDampedSystem() {
        /*
            Placeholder

            Future implementation

            (JᵀJ + λI)

            QR / Cholesky / Sparse

        */
        return new Array(this.variables.length).fill(0);
    }
    info() {
        return {
            engine: "LevenbergMarquardtSolver",
            variables: this.variables.length,
            constraints: this.constraints.length,
            lambda: this.lambda,
            tolerance: this.tolerance,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=LevenbergMarquardtSolver.js.map