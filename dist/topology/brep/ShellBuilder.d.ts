import { Face } from "../core/Face";
import { Shell } from "../core/Shell";
export interface ShellBuildOptions {
    sew?: boolean;
    requireClosed?: boolean;
    orientFaces?: boolean;
}
export interface ShellBuildResult {
    shell: Shell;
    valid: boolean;
    errors: string[];
}
export declare class ShellBuilder {
    tolerance: number;
    private matcher;
    constructor(tolerance?: number);
    build(faces: Face[], options?: ShellBuildOptions): ShellBuildResult;
    buildClosedShell(faces: Face[]): Shell;
    private validateConnectivity;
    private orientFaces;
    private hasConsistentOrientation;
    getNeighbourFaces(face: Face, shell: Shell): Face[];
    private isClosed;
    addFace(shell: Shell, face: Face): void;
    removeFace(shell: Shell, face: Face): void;
    merge(shellA: Shell, shellB: Shell): Shell;
}
