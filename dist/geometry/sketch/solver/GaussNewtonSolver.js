import { SketchNumericalSolver } from "./SketchNumericalSolver";
export class GaussNewtonSolver extends SketchNumericalSolver {
    damping = 1.0;
    solve() {
        let iteration = 0;
        let residual = this.computeResidual();
        while (iteration < this.maxIterations &&
            residual > this.tolerance) {
            this.performIteration();
            residual = this.computeResidual();
            iteration++;
        }
        return {
            converged: residual <= this.tolerance,
            iterations: iteration,
            residual
        };
    }
    performIteration() {
        const delta = this.solveLeastSquares();
        for (let i = 0; i < this.variables.length; i++) {
            this.variables[i].value +=
                delta[i] * this.damping;
        }
    }
    solveLeastSquares() {
        /*
            Placeholder

            Future implementation

            JᵀJ

            JᵀF

            QR

            Cholesky

            Sparse Solver

        */
        return new Array(this.variables.length).fill(0);
    }
    info() {
        return {
            engine: "GaussNewtonSolver",
            variables: this.variables.length,
            constraints: this.constraints.length,
            damping: this.damping,
            tolerance: this.tolerance
        };
    }
}
//# sourceMappingURL=GaussNewtonSolver.js.map