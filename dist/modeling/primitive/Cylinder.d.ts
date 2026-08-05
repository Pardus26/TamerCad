import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Solid } from "../../topology/core/Solid";
export declare class Cylinder {
    radius: number;
    height: number;
    center: Point;
    axis: Vector3;
    constructor(radius: number, height: number, center?: Point, axis?: Vector3);
    build(): Solid;
    private createVertices;
    private createEdges;
    private createFaces;
    private createWire;
}
