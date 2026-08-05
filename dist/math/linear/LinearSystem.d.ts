import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
export declare class LinearSystem {
    readonly A: Matrix;
    readonly b: Vector;
    constructor(A: Matrix, b: Vector);
    dimension(): number;
    clone(): LinearSystem;
    residual(x: Vector): number;
    validate(): boolean;
    serialize(): {
        matrix: {
            rows: number;
            cols: number;
            values: number[][];
        };
        vector: {
            size: number;
            values: number[];
        };
    };
    info(): {
        engine: string;
        rows: number;
        cols: number;
    };
}
