import { Point } from "../../geometry/core/Point";
import { Solid } from "../../topology/core/Solid";
export declare class Sphere {
    radius: number;
    center: Point;
    constructor(radius: number, center?: Point);
    build(): Solid;
    private createPoleVertices;
    private createEdges;
    private createWire;
}
