import { Curve3 } from "./Curve3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class CircleCurve3 extends Curve3 {
    center: Point3;
    radius: number;
    normal: Vector3;
    constructor(center: Point3, radius: number, normal?: Vector3);
    /**
     * Circle parametric evaluation
     *
     * t:
     * 0 -> 1
     *
     * 0-1 arası tam tur
     */
    evaluate(t: number): Point3;
    startPoint(): Point3;
    endPoint(): Point3;
    length(): number;
    tangent(t: number): Vector3;
    circumference(): number;
    pointAtAngle(angle: number): Point3;
    containsPoint(point: Point3, tolerance?: number): boolean;
    reverse(): CircleCurve3;
    clone(): CircleCurve3;
    toString(): string;
}
