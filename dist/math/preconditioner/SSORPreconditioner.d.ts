import { SparseVector } from "../sparse/SparseVector";
import { Preconditioner } from "./Preconditioner";
export declare class SSORPreconditioner extends Preconditioner {
    relaxation: number;
    protected onBuild(): void;
    apply(vector: SparseVector): SparseVector;
    protected forwardSweep(vector: SparseVector): SparseVector;
    protected backwardSweep(vector: SparseVector): SparseVector;
    info(): {
        engine: string;
        omega: number;
        initialized: boolean;
    };
}
