import { SparseLinearSystem } from "./SparseLinearSystem";
import { SparseVector } from "./SparseVector";
export declare class SparseLUSolver {
    solve(system: SparseLinearSystem): SparseVector;
    protected symbolicFactorization(system: SparseLinearSystem): void;
    protected numericFactorization(system: SparseLinearSystem): void;
    protected forwardSolve(system: SparseLinearSystem): SparseVector;
    protected backwardSolve(system: SparseLinearSystem, y: SparseVector): SparseVector;
    residual(system: SparseLinearSystem, x: SparseVector): number;
    info(): {
        engine: string;
        direct: boolean;
        sparse: boolean;
    };
}
