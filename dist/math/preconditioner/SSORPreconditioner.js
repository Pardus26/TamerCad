import { Preconditioner } from "./Preconditioner";
export class SSORPreconditioner extends Preconditioner {
    relaxation = 1.0;
    onBuild() {
        /*
            Placeholder

            Future

            Extract D

            Extract L

            Extract U

        */
    }
    apply(vector) {
        const y = this.forwardSweep(vector);
        return this.backwardSweep(y);
    }
    forwardSweep(vector) {
        /*
            Placeholder

        */
        return vector;
    }
    backwardSweep(vector) {
        /*
            Placeholder

        */
        return vector;
    }
    info() {
        return {
            engine: "SSORPreconditioner",
            omega: this.relaxation,
            initialized: this.isInitialized()
        };
    }
}
//# sourceMappingURL=SSORPreconditioner.js.map