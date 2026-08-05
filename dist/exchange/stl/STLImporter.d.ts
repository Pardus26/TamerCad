import { Document } from "../../persistence/core/Document";
import { FileReader } from "../../persistence/io/FileReader";
import { STLReader } from "./STLReader";
export interface STLImportOptions {
    mergeIntoDocument?: boolean;
}
export interface STLImportResult {
    success: boolean;
    path: string;
    document?: Document;
    error?: Error;
}
export declare class STLImporter {
    private readonly reader;
    private readonly fileReader;
    constructor(reader: STLReader | undefined, fileReader: FileReader);
    import(path: string, _options?: STLImportOptions): Promise<STLImportResult>;
    importFromString(asciiSTL: string): Document;
    importFromBinary(binarySTL: ArrayBuffer): Document;
}
