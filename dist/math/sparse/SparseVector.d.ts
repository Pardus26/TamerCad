import { Vector } from "../core/Vector";
export declare class SparseVector {
    readonly size: number;
    readonly indices: number[];
    readonly values: number[];
    constructor(size: number);
    static fromDense(vector: Vector): SparseVector;
    get(index: number): number;
    set(index: number, value: number): void;
    dot(other: SparseVector): number;
    norm(): number;
    nonZeroCount(): number;
    density(): number;
    toDense(): Vector;
    serialize(): {
        size: number;
        indices: number[];
        values: number[];
    };
    info(): {
        engine: string;
        size: number;
        nonZeros: number;
        density: number;
    };
}
