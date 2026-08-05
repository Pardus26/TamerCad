import { MeshBody } from "../../geometry/mesh/MeshBody";
export type STLFormat = "ascii" | "binary";
export interface STLWriteOptions {
    format?: STLFormat;
    solidName?: string;
}
export declare class STLWriter {
    private readonly asciiWriter;
    private readonly binaryWriter;
    write(body: MeshBody, options?: STLWriteOptions): string | ArrayBuffer;
}
