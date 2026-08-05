import { Curve } from "../../geometry/curve/Curve";
import { Wire } from "../../topology/core/Wire";
import { Solid } from "../../topology/core/Solid";
export interface SweepOptions {
    sections?: number;
    makeSolid?: boolean;
    scale?: number;
    capStart?: boolean;
    capEnd?: boolean;
}
export declare class Sweep {
    profile: Wire;
    path: Curve;
    options: SweepOptions;
    constructor(profile: Wire, path: Curve, options?: SweepOptions);
    build(): Solid;
    private getScale;
    private placeProfile;
    private transformPoint;
    private createFrame;
    private createFaces;
    private normalize;
    getProfile(): Wire;
    getPath(): Curve;
    getSections(): number;
}
