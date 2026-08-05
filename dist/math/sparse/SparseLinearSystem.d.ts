import { SparseMatrix } from "./SparseMatrix";
import { SparseVector } from "./SparseVector";
export declare class SparseLinearSystem {
    readonly A: SparseMatrix;
    readonly b: SparseVector;
    constructor(A: SparseMatrix, b: SparseVector);
    dimension(): number;
    validate(): boolean;
    clone(): SparseLinearSystem;
    residual(x: SparseVector): number;
    nonZeroCount(): number;
    density(): number;
    serialize(): {
        matrix: {
            rows: number;
            cols: number;
            values: number[];
            columns: number[];
            pointers: number[];
        };
        vector: {
            size: number;
            indices: number[];
            values: number[];
        };
    };
    info(): {
        engine: string;
        rows: number;
        cols: number;
        nonZeros: number;
        density: number;
    };
}
