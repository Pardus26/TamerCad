import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { HalfEdge } from "../core/HalfEdge";
import { Shell } from "../core/Shell";
import { Solid } from "../core/Solid";
export interface SewingResult {
    shell: Shell;
    halfEdges: HalfEdge[];
    sewn: boolean;
    errors: string[];
}
export declare class FaceSewing {
    tolerance: number;
    private matcher;
    constructor(tolerance?: number);
    sewFaces(faces: Face[]): SewingResult;
    createSolid(faces: Face[]): Solid;
    private createHalfEdges;
    private connectTwins;
    private connectLoops;
    getBoundaryEdges(shell: Shell): Edge[];
    isClosed(shell: Shell): boolean;
}
