import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
export class SolverAnalyzer {
    static analyze(system) {
        return {
            sparse: this.isSparse(system),
            symmetric: this.isSymmetric(system),
            spd: this.isSPD(system),
            dimension: this.dimension(system),
            density: this.density(system)
        };
    }
    static isSparse(system) {
        return;
        system instanceof
            SparseLinearSystem;
    }
    static dimension(system) {
        return system.dimension();
    }
    static density(system) {
        if (system instanceof
            SparseLinearSystem) {
            return system.density();
        }
        return 1.0;
    }
    static isSymmetric(system) {
        /*
            Placeholder

            Future

            Matrix symmetry test

        */
        return false;
    }
    static isSPD(system) {
        /*
            Placeholder

            Future

            Cholesky attempt

            Eigenvalue estimate

        */
        return false;
    }
}
//# sourceMappingURL=SolverAnalyzer.js.map