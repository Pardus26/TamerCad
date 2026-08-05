import { SparseMatrix } from "../sparse/SparseMatrix";
import { SparseVector } from "../sparse/SparseVector";
export declare abstract class Preconditioner {
    protected matrix?: SparseMatrix;
    protected initialized: boolean;
    build(matrix: SparseMatrix): void;
    protected abstract onBuild(): void;
    abstract apply(vector: SparseVector): SparseVector;
    update(): void;
    protected onUpdate(): void;
    reset(): void;
    isInitialized(): boolean;
    abstract info(): {
        engine: string;
        [key: string]: unknown;
    };
}
