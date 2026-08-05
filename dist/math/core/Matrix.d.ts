export declare class Matrix {
    private readonly values;
    readonly rows: number;
    readonly cols: number;
    constructor(values: number[][]);
    static zeros(rows: number, cols: number): Matrix;
    static identity(size: number): Matrix;
    get(row: number, col: number): number;
    set(row: number, col: number, value: number): void;
    clone(): Matrix;
    transpose(): Matrix;
    add(other: Matrix): Matrix;
    subtract(other: Matrix): Matrix;
    multiply(other: Matrix): Matrix;
    scale(value: number): Matrix;
    trace(): number;
    toArray(): number[][];
    serialize(): {
        rows: number;
        cols: number;
        values: number[][];
    };
    private assertSameShape;
    info(): {
        rows: number;
        cols: number;
    };
}
