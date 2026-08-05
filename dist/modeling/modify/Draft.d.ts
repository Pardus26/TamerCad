import { Solid } from "../../topology/core/Solid";
import { Face } from "../../topology/core/Face";
import { Vector3 } from "../../geometry/core/Vector3";
import { Point } from "../../geometry/core/Point";
export interface DraftOptions {
    direction?: Vector3;
    preserveTopology?: boolean;
}
export declare class Draft {
    solid: Solid;
    faces: Face[];
    angle: number;
    neutralPlane: Point;
    options: DraftOptions;
    private draftDirection;
    constructor(solid: Solid, faces: Face[], angle: number, neutralPlane: Point, options?: DraftOptions);
    build(): Solid;
    private isDraftFace;
    private applyDraft;
    private normalize;
    getAngle(): number;
    getNeutralPlane(): Point;
    getFaces(): Face[];
    getDirection(): Vector3 | undefined;
    preserveTopology(): boolean;
}
