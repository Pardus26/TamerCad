import { SparseVector } from "../sparse/SparseVector";
export class ConjugateGradientSolver {
    tolerance = 1e-8;
    maxIterations = 1000;
    solve(system) {
        const x = new SparseVector(system.dimension());
        let residual = system.residual(x);
        let iteration = 0;
        while (iteration < this.maxIterations &&
            residual > this.tolerance) {
            this.performIteration();
            residual =
                system.residual(x);
            iteration++;
        }
        return {
            converged: residual <= this.tolerance,
            iterations: iteration,
            residual
        };
    }
    performIteration() {
        /*
            Placeholder

            Future

            α

            β

            p

            r

            x

        */
    }
    info() {
        return {
            engine: "ConjugateGradientSolver",
            tolerance: this.tolerance,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=ConjugateGradientSolver.js.map