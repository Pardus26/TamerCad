import { SparseVector } from "../sparse/SparseVector";
import { Preconditioner } from "./Preconditioner";
export declare class JacobiPreconditioner extends Preconditioner {
    private inverseDiagonal;
    protected onBuild(): void;
    apply(vector: SparseVector): SparseVector;
    info(): {
        engine: string;
        initialized: boolean;
    };
}
