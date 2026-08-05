import { LinearSystem } from "../linear/LinearSystem";
import { SparseLinearSystem } from "../sparse/SparseLinearSystem";
import { LUSolver } from "../linear/LUSolver";
import { GMRESSolver } from "../iterative/GMRESSolver";
import { ILUPreconditioner } from "../preconditioner/ILUPreconditioner";
export declare class SolverFactory {
    static create(system: LinearSystem | SparseLinearSystem): LUSolver | {
        solver: GMRESSolver;
        preconditioner: ILUPreconditioner;
    };
    protected static createDense(system: LinearSystem): LUSolver;
    protected static createSparse(system: SparseLinearSystem): {
        solver: GMRESSolver;
        preconditioner: ILUPreconditioner;
    };
    static info(): {
        engine: string;
    };
}
