import { Curve3 } from "./Curve3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class LineCurve3 extends Curve3 {
    start: Point3;
    end: Point3;
    constructor(start: Point3, end: Point3);
    /**
     * Parametric evaluation
     *
     * t = 0  başlangıç
     * t = 1  bitiş
     */
    evaluate(t: number): Point3;
    startPoint(): Point3;
    endPoint(): Point3;
    direction(): Vector3;
    length(): number;
    tangent(_t?: number): Vector3;
    reverse(): LineCurve3;
    closestPoint(point: Point3): Point3;
    split(t: number): {
        first: LineCurve3;
        second: LineCurve3;
    };
    clone(): LineCurve3;
    toString(): string;
}
