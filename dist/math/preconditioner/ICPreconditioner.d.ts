import { SparseVector } from "../sparse/SparseVector";
import { Preconditioner } from "./Preconditioner";
export declare class ICPreconditioner extends Preconditioner {
    private factorized;
    protected onBuild(): void;
    protected validateSPD(): void;
    protected symbolicFactorization(): void;
    protected numericFactorization(): void;
    apply(vector: SparseVector): SparseVector;
    protected forwardSolve(vector: SparseVector): SparseVector;
    protected backwardSolve(vector: SparseVector): SparseVector;
    info(): {
        engine: string;
        initialized: boolean;
        factorized: boolean;
    };
}
