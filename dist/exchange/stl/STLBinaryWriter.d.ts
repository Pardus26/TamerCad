import { MeshBody } from "../../geometry/mesh/MeshBody";
export interface STLBinaryWriteOptions {
    solidName?: string;
}
export declare class STLBinaryWriter {
    write(body: MeshBody, _options?: STLBinaryWriteOptions): ArrayBuffer;
    private computeNormal;
}
