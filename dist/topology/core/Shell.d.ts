import { Face } from "./Face";
import { Edge } from "./Edge";
import { Vertex } from "./Vertex";
export declare class Shell {
    private faces;
    reversed: boolean;
    constructor(faces?: Face[]);
    addFace(face: Face): void;
    removeFace(face: Face): boolean;
    getFaces(): Face[];
    getEdges(): Edge[];
    getVertices(): Vertex[];
    isClosed(): boolean;
    containsFace(face: Face): boolean;
    faceCount(): number;
    reverse(): Shell;
    clear(): void;
    clone(): Shell;
    isValid(): boolean;
}
