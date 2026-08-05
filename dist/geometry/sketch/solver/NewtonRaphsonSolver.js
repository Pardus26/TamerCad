import { SketchNumericalSolver } from "./SketchNumericalSolver";
export class NewtonRaphsonSolver extends SketchNumericalSolver {
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
        const delta = this.solveLinearSystem();
        for (let i = 0; i < this.variables.length; i++) {
            this.variables[i].value += delta[i];
        }
    }
    solveLinearSystem() {
        /*
            Placeholder

            Future:

            LU

            QR

            SVD

            Sparse Solver

        */
        return new Array(this.variables.length).fill(0);
    }
    info() {
        return {
            engine: "NewtonRaphsonSolver",
            variables: this.variables.length,
            constraints: this.constraints.length,
            tolerance: this.tolerance,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=NewtonRaphsonSolver.js.map