import { Preconditioner } from "./Preconditioner";
export class ILUPreconditioner extends Preconditioner {
    factorized = false;
    onBuild() {
        if (!this.matrix) {
            return;
        }
        this.symbolicFactorization();
        this.numericFactorization();
        this.factorized = true;
    }
    symbolicFactorization() {
        /*
            Placeholder

            Future

            Elimination graph

            Pattern analysis

        */
    }
    numericFactorization() {
        /*
            Placeholder

            Future

            ILU(0)

            ILUT

            ILUC

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
        /*
            Placeholder

        */
        return vector;
    }
    backwardSolve(vector) {
        /*
            Placeholder

        */
        return vector;
    }
    info() {
        return {
            engine: "ILUPreconditioner",
            initialized: this.isInitialized(),
            factorized: this.factorized
        };
    }
}
//# sourceMappingURL=ILUPreconditioner.js.map