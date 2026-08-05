import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Transform } from "../../geometry/core/Transform";
export declare enum SketchPlaneType {
    XY = "XY",
    XZ = "XZ",
    YZ = "YZ",
    Custom = "Custom"
}
export declare class SketchPlane {
    type: SketchPlaneType;
    origin: Point;
    normal: Vector3;
    xAxis: Vector3;
    yAxis: Vector3;
    constructor(type: SketchPlaneType, origin: Point, normal: Vector3, xAxis: Vector3, yAxis: Vector3);
    static XY(): SketchPlane;
    static XZ(): SketchPlane;
    static YZ(): SketchPlane;
    toWorld(u: number, v: number): Point;
    projectPoint(point: Point): {
        u: number;
        v: number;
    };
    normalVector(): Vector3;
    transform(): Transform;
}
