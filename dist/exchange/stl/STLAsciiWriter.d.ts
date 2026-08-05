import { MeshBody } from "../../geometry/mesh/MeshBody";
export interface STLAsciiWriteOptions {
    solidName?: string;
}
export declare class STLAsciiWriter {
    write(body: MeshBody, options?: STLAsciiWriteOptions): string;
    private computeNormal;
}
