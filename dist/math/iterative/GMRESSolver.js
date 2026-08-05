import { SparseVector } from "../sparse/SparseVector";
export class GMRESSolver {
    tolerance = 1e-8;
    maxIterations = 1000;
    restart = 50;
    solve(system) {
        const x = new SparseVector(system.dimension());
        let residual = system.residual(x);
        let iteration = 0;
        while (iteration < this.maxIterations &&
            residual > this.tolerance) {
            this.performRestartCycle();
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
    performRestartCycle() {
        /*
            Placeholder

            Future

            Arnoldi

            Hessenberg

            Givens Rotations

            Least Squares

        */
    }
    info() {
        return {
            engine: "GMRESSolver",
            tolerance: this.tolerance,
            restart: this.restart,
            maxIterations: this.maxIterations
        };
    }
}
//# sourceMappingURL=GMRESSolver.js.map