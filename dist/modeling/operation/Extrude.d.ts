import { Vector3 } from "../../geometry/core/Vector3";
import { Wire } from "../../topology/core/Wire";
import { Solid } from "../../topology/core/Solid";
export interface ExtrudeOptions {
    makeSolid?: boolean;
    capStart?: boolean;
    capEnd?: boolean;
}
export declare class Extrude {
    profile: Wire;
    direction: Vector3;
    distance: number;
    options: ExtrudeOptions;
    private normalizedDirection;
    constructor(profile: Wire, direction: Vector3, distance: number, options?: ExtrudeOptions);
    build(): Solid;
    private createFace;
    private translatePoint;
    private normalizeDirection;
    private cloneWire;
    private translateWire;
    private createSideFaces;
    getDirection(): Vector3;
    getDistance(): number;
    getProfile(): Wire;
}
