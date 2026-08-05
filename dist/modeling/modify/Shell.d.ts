import { Solid } from "../../topology/core/Solid";
import { Face } from "../../topology/core/Face";
export interface ShellOptions {
    inward?: boolean;
    removeFaces?: Face[];
    preserveTopology?: boolean;
}
export declare class Shell {
    solid: Solid;
    thickness: number;
    options: ShellOptions;
    constructor(solid: Solid, thickness: number, options?: ShellOptions);
    build(): Solid;
    private offsetFace;
    private createWallFaces;
}
