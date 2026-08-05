import { Mesh } from "./Mesh";
import { MeshBody } from "./MeshBody";
export interface SerializedMeshDocument {
    version: number;
    mesh: any;
}
export interface SerializedMeshBody {
    version: number;
    body: any;
}
export declare class MeshSerializer {
    static readonly VERSION = 1;
    serializeMesh(mesh: Mesh, pretty?: boolean): string;
    deserializeMesh(json: string): Mesh;
    serializeBody(body: MeshBody, pretty?: boolean): string;
    deserializeBody(json: string): MeshBody;
    toObject(mesh: Mesh): object;
    fromObject(object: any): Mesh;
    private checkVersion;
}
