import { Shell } from "./Shell";
import { Face } from "./Face";
import { Edge } from "./Edge";
import { Vertex } from "./Vertex";
export declare class Solid {
    private shells;
    constructor(shell?: Shell);
    addShell(shell: Shell): void;
    removeShell(shell: Shell): boolean;
    getShells(): Shell[];
    getFaces(): Face[];
    getEdges(): Edge[];
    getVertices(): Vertex[];
    isValid(): boolean;
    volume(): number;
    surfaceArea(): number;
    containsFace(face: Face): boolean;
    containsEdge(edge: Edge): boolean;
    containsShell(shell: Shell): boolean;
    shellCount(): number;
    clear(): void;
    clone(): Solid;
}
