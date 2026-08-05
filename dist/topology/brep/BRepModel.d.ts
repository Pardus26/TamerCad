import { Solid } from "../core/Solid";
import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
export interface BRepModelInfo {
    name?: string;
    createdAt?: Date;
}
export declare class BRepModel {
    private solids;
    private activeSolid;
    info: BRepModelInfo;
    constructor(info?: BRepModelInfo);
    addSolid(solid: Solid): void;
    removeSolid(solid: Solid): boolean;
    findSolid(predicate: (solid: Solid) => boolean): Solid | undefined;
    getSolids(): Solid[];
    getActiveSolid(): Solid | null;
    setActiveSolid(solid: Solid): boolean;
    getFaces(): Face[];
    getEdges(): Edge[];
    getVertices(): Vertex[];
    clear(): void;
    isEmpty(): boolean;
    solidCount(): number;
    clone(): BRepModel;
    validate(): boolean;
}
