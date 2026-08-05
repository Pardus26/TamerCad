import { Point } from "../../geometry/core/Point";
import { Solid } from "../../topology/core/Solid";
export declare class Box {
    width: number;
    height: number;
    depth: number;
    origin: Point;
    constructor(width: number, height: number, depth: number, origin?: Point);
    build(): Solid;
    private createVertices;
    private createEdges;
    private createFaces;
}
