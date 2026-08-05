import { Surface3 } from "./Surface3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class PlaneSurface3 extends Surface3 {
    origin: Point3;
    normalVector: Vector3;
    uDirection: Vector3;
    vDirection: Vector3;
    constructor(origin: Point3, normal?: Vector3);
    /**
     * Plane parametric evaluation
     *
     * P(u,v)=O+uU+vV
     */
    evaluate(u: number, v: number): Point3;
    startPoint(): Point3;
    normal(_u: number, _v: number): Vector3;
    distanceToPoint(point: Point3): number;
    projectPoint(point: Point3): Point3;
    containsPoint(point: Point3, tolerance?: number): boolean;
    type(): string;
    clone(): PlaneSurface3;
    toString(): string;
}
