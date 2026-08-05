import { BRepModel } from "./BRepModel";
export interface SerializedVertex {
    id: string;
    x: number;
    y: number;
    z: number;
}
export interface SerializedEdge {
    id: string;
    start: string;
    end: string;
}
export interface SerializedFace {
    id: string;
    edges: string[];
}
export interface SerializedShell {
    id: string;
    faces: string[];
}
export interface SerializedSolid {
    id: string;
    shells: string[];
}
export interface SerializedBRep {
    vertices: SerializedVertex[];
    edges: SerializedEdge[];
    faces: SerializedFace[];
    shells: SerializedShell[];
    solids: SerializedSolid[];
}
export declare class BRepSerializer {
    serialize(model: BRepModel): SerializedBRep;
    deserialize(data: SerializedBRep): BRepModel;
    toJSON(model: BRepModel): string;
    fromJSON(json: string): BRepModel;
}
