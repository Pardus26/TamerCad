import { MeshBody } from "../../geometry/mesh/MeshBody";
import { FileWriter } from "../../persistence/io/FileWriter";
import { STLFormat, STLWriter } from "./STLWriter";
export interface STLExportOptions {
    format?: STLFormat;
    overwrite?: boolean;
    solidName?: string;
}
export interface STLExportResult {
    success: boolean;
    path: string;
    bytesWritten: number;
    error?: Error;
}
export declare class STLExporter {
    private readonly writer;
    private readonly fileWriter;
    constructor(writer: STLWriter | undefined, fileWriter: FileWriter);
    export(body: MeshBody, path: string, options?: STLExportOptions): Promise<STLExportResult>;
    exportToString(body: MeshBody): string;
    exportToBinary(body: MeshBody): ArrayBuffer;
}
