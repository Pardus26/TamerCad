import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
import { LinearSystem } from "./LinearSystem";
export declare class CholeskySolver {
    solve(system: LinearSystem): Vector;
    protected factorize(A: Matrix): Matrix;
    protected forwardSolve(L: Matrix, b: Vector): Vector;
    protected backwardSolve(L: Matrix, y: Vector): Vector;
    residual(system: LinearSystem, x: Vector): number;
    info(): {
        engine: string;
    };
}
