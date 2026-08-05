import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare abstract class Surface {
    /**
     * Minimum U parameter
     */
    abstract get uMin(): number;
    /**
     * Maximum U parameter
     */
    abstract get uMax(): number;
    /**
     * Minimum V parameter
     */
    abstract get vMin(): number;
    /**
     * Maximum V parameter
     */
    abstract get vMax(): number;
    /**
     * Surface evaluation

     S(u,v)

     */
    abstract evaluate(u: number, v: number): Point;
    /**
     * First derivative in U direction

     ∂S/∂u

     */
    abstract derivativeU(u: number, v: number): Vector3;
    /**
     * First derivative in V direction

     ∂S/∂v

     */
    abstract derivativeV(u: number, v: number): Vector3;
    /**
     * Surface normal

     N = Su x Sv

     */
    normal(u: number, v: number): Vector3;
    /**
     * Approximate closest point

     */
    closestPoint(point: Point): Point;
    /**
     * Projection

     */
    projectPoint(point: Point): Point;
    /**
     * Surface bounding box
     */
    abstract boundingBox(): BoundingBox;
    /**
     * Orientation reverse

     */
    abstract reverse(): Surface;
    /**
     * Transformation

     */
    abstract transform(transform: Transform): Surface;
}
