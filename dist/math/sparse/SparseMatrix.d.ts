import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
export declare class SparseMatrix {
    readonly rows: number;
    readonly cols: number;
    readonly values: number[];
    readonly columnIndices: number[];
    readonly rowPointers: number[];
    constructor(rows: number, cols: number);
    static fromDense(matrix: Matrix): SparseMatrix;
    get(row: number, col: number): number;
    multiply(vector: Vector): Vector;
    nonZeroCount(): number;
    density(): number;
    toDense(): Matrix;
    serialize(): {
        rows: number;
        cols: number;
        values: number[];
        columns: number[];
        pointers: number[];
    };
    info(): {
        engine: string;
        rows: number;
        cols: number;
        nonZeros: number;
        density: number;
    };
}
