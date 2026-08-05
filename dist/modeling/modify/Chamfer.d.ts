import { Solid } from "../../topology/core/Solid";
import { Edge } from "../../topology/core/Edge";
export interface ChamferOptions {
    angle?: number;
    preserveTopology?: boolean;
    segments?: number;
}
export declare class Chamfer {
    solid: Solid;
    edges: Edge[];
    distance: number;
    options: ChamferOptions;
    constructor(solid: Solid, edges: Edge[], distance: number, options?: ChamferOptions);
    build(): Solid;
    private isAffected;
    private createChamferFace;
    private getAdjacentFaces;
    getDistance(): number;
    getAngle(): number;
    getEdges(): Edge[];
    getSegments(): number;
    preserveTopology(): boolean;
}
