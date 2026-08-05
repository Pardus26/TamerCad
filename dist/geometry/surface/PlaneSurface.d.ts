import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Plane } from "../core/Plane";
import { BoundingBox } from "../core/BoundingBox";
import { Transform } from "../core/Transform";
export declare class PlaneSurface extends Surface {
    plane: Plane;
    size: number;
    constructor(plane: Plane, size?: number);
    get uMin(): number;
    get uMax(): number;
    get vMin(): number;
    get vMax(): number;
    evaluate(u: number, v: number): Point;
    derivativeU(u: number, v: number): Vector3;
    derivativeV(u: number, v: number): Vector3;
    normal(u: number, v: number): Vector3;
    area(): number;
    boundingBox(): BoundingBox;
    reverse(): PlaneSurface;
    transform(transform: Transform): PlaneSurface;
}
