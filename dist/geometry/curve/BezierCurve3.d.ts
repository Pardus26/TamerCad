import { Curve3 } from "./Curve3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class BezierCurve3 extends Curve3 {
    controlPoints: Point3[];
    constructor(controlPoints: Point3[]);
    /**
     * Degree of Bezier curve
     */
    degree(): number;
    /**
     * De Casteljau algorithm
     */
    evaluate(t: number): Point3;
    startPoint(): Point3;
    endPoint(): Point3;
    tangent(t: number): Vector3;
    length(segments?: number): number;
    addControlPoint(point: Point3): void;
    removeControlPoint(index: number): void;
    getControlPoints(): Point3[];
    reverse(): BezierCurve3;
    clone(): BezierCurve3;
    toString(): string;
}
