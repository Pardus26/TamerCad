import { Wire } from "../../topology/core/Wire";
import { Solid } from "../../topology/core/Solid";
export interface LoftOptions {
    closed?: boolean;
    solid?: boolean;
    smooth?: boolean;
    capStart?: boolean;
    capEnd?: boolean;
}
export declare class Loft {
    profiles: Wire[];
    options: LoftOptions;
    constructor(profiles: Wire[], options?: LoftOptions);
    build(): Solid;
    private validateProfiles;
    private createFaces;
    private createLoftFace;
    private createClosingFaces;
    getProfiles(): Wire[];
    isSmooth(): boolean;
    isClosed(): boolean;
}
