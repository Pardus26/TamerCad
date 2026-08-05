import { Matrix } from "../core/Matrix";
import { Vector } from "../core/Vector";
import { LinearSystem } from "./LinearSystem";
export declare class QRSolver {
    solve(system: LinearSystem): Vector;
    protected computeQ(A: Matrix): Matrix;
    protected computeR(A: Matrix): Matrix;
    protected multiplyTranspose(Q: Matrix, b: Vector): Vector;
    protected backSubstitution(R: Matrix, y: Vector): Vector;
    residual(system: LinearSystem, x: Vector): number;
    info(): {
        engine: string;
    };
}
