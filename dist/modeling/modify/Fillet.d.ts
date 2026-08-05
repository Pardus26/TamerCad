import { Solid } from "../../topology/core/Solid";
import { Edge } from "../../topology/core/Edge";
export interface FilletOptions {
    segments?: number;
    preserveTopology?: boolean;
    smooth?: boolean;
}
export declare class Fillet {
    solid: Solid;
    edges: Edge[];
    radius: number;
    options: FilletOptions;
    constructor(solid: Solid, edges: Edge[], radius: number, options?: FilletOptions);
    build(): Solid;
    private isAffected;
    private createFilletFace;
    private getAdjacentFaces;
    getRadius(): number;
    getEdges(): Edge[];
    getSegments(): number;
    isSmooth(): boolean;
    preserveTopology(): boolean;
}
