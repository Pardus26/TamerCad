import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
import { LinearSystem } from "./LinearSystem";
export declare class SVDSolver {
    tolerance: number;
    solve(system: LinearSystem): Vector;
    protected factorize(A: Matrix): {
        U: Matrix;
        S: Vector;
        V: Matrix;
    };
    protected computePseudoInverse(U: Matrix, S: Vector, V: Matrix): Matrix;
    protected multiply(A: Matrix, b: Vector): Vector;
    rank(S: Vector): number;
    conditionNumber(S: Vector): number;
    residual(system: LinearSystem, x: Vector): number;
    info(): {
        engine: string;
        tolerance: number;
    };
}
