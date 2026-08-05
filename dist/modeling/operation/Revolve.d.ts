import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Wire } from "../../topology/core/Wire";
import { Solid } from "../../topology/core/Solid";
export interface RevolveOptions {
    segments?: number;
    makeSolid?: boolean;
    capStart?: boolean;
    capEnd?: boolean;
}
export declare class Revolve {
    profile: Wire;
    axisPoint: Point;
    axisDirection: Vector3;
    angle: number;
    options: RevolveOptions;
    private normalizedAxis;
    constructor(profile: Wire, axisPoint: Point, axisDirection: Vector3, angle?: number, options?: RevolveOptions);
    build(): Solid;
    private rotatePoint;
    private rotateWire;
    private createFaces;
    private normalize;
    getAxis(): Vector3;
    getAngle(): number;
    getSegments(): number;
}
