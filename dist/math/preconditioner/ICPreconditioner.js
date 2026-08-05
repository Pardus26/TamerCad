import { Preconditioner } from "./Preconditioner";
export class ICPreconditioner extends Preconditioner {
    factorized = false;
    onBuild() {
        if (!this.matrix) {
            return;
        }
        this.validateSPD();
        this.symbolicFactorization();
        this.numericFactorization();
        this.factorized = true;
    }
    validateSPD() {
        /*
            Placeholder

            Future

            Symmetry check

            Positive diagonal

        */
    }
    symbolicFactorization() {
        /*
            Placeholder

            Future

            Sparsity pattern

        */
    }
    numericFactorization() {
        /*
            Placeholder

            Future

            IC(0)

            ICT

        */
    }
    apply(vector) {
        if (!this.factorized) {
            return vector;
        }
        const y = this.forwardSolve(vector);
        return this.backwardSolve(y);
    }
    forwardSolve(vector) {
        return vector;
    }
    backwardSolve(vector) {
        return vector;
    }
    info() {
        return {
            engine: "ICPreconditioner",
            initialized: this.isInitialized(),
            factorized: this.factorized
        };
    }
}
//# sourceMappingURL=ICPreconditioner.js.map