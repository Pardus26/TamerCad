import { Solid } from "../core/Solid";
import { Shell } from "../core/Shell";
import { Face } from "../core/Face";
import { ShellBuilder } from "./ShellBuilder";
export interface SolidBuildOptions {
    requireClosed?: boolean;
    validateManifold?: boolean;
    orientShells?: boolean;
}
export interface SolidBuildResult {
    solid: Solid;
    valid: boolean;
    errors: string[];
}
export declare class SolidBuilder {
    private shellBuilder;
    constructor(shellBuilder?: ShellBuilder);
    build(shells: Shell[], options?: SolidBuildOptions): SolidBuildResult;
    buildFromFaces(faces: Face[], options?: SolidBuildOptions): SolidBuildResult;
    createSolid(shell: Shell): Solid;
    addShell(solid: Solid, shell: Shell): void;
    removeShell(solid: Solid, shell: Shell): void;
    private isClosed;
    private isManifold;
    private orientShells;
    private isSameOrientation;
    private reverseShell;
    getVolume(solid: Solid): number;
    getSurfaceArea(solid: Solid): number;
    validate(solid: Solid): boolean;
}
