import { SparseVector } from "./SparseVector";
export class SparseLUSolver {
    solve(system) {
        this.symbolicFactorization(system);
        this.numericFactorization(system);
        const y = this.forwardSolve(system);
        return this.backwardSolve(system, y);
    }
    symbolicFactorization(system) {
        /*
            Placeholder

            Future

            Elimination Tree

            Fill Reduction

            AMD

            METIS

        */
    }
    numericFactorization(system) {
        /*
            Placeholder

            Sparse LU

        */
    }
    forwardSolve(system) {
        return new SparseVector(system.dimension());
    }
    backwardSolve(system, y) {
        return y;
    }
    residual(system, x) {
        return system.residual(x);
    }
    info() {
        return {
            engine: "SparseLUSolver",
            direct: true,
            sparse: true
        };
    }
}
//# sourceMappingURL=SparseLUSolver.js.map