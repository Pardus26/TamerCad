import { Face } from "../core/Face";
import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
export interface BooleanBuildOptions {
    sew?: boolean;
    validate?: boolean;
}
export interface BooleanBuildResult {
    solid: Solid | null;
    success: boolean;
    errors: string[];
}
export declare class BooleanResultBuilder {
    tolerance: number;
    private sewing;
    private validator;
    constructor(tolerance?: number);
    buildFromFaces(faces: Face[], options?: BooleanBuildOptions): BooleanBuildResult;
    unionFaces(facesA: Face[], facesB: Face[]): BooleanBuildResult;
    buildShell(faces: Face[]): Shell;
    removeDuplicateFaces(faces: Face[]): Face[];
    filterFaces(faces: Face[], predicate: (face: Face) => boolean): Face[];
    createSolid(shell: Shell): Solid;
    validate(solid: Solid): boolean;
    private sameFace;
}
