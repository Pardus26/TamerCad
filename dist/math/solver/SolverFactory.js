import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
import { LUSolver } from "../linear/LUSolver";
import { GMRESSolver } from "../iterative/GMRESSolver";
import { ILUPreconditioner } from "../preconditioner/ILUPreconditioner";
export class SolverFactory {
    static create(system) {
        if (system instanceof SparseLinearSystem) {
            return this.createSparse(system);
        }
        return this.createDense(system);
    }
    static createDense(system) {
        return new LUSolver();
    }
    static createSparse(system) {
        return {
            solver: new GMRESSolver(),
            preconditioner: new ILUPreconditioner()
        };
    }
    static info() {
        return {
            engine: "SolverFactory"
        };
    }
}
//# sourceMappingURL=SolverFactory.js.map