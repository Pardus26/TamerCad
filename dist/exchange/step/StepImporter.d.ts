import { Document } from "../../persistence/core/Document";
import { FileReader } from "../../persistence/io/FileReader";
import { StepReader } from "./StepReader";
export interface StepImportOptions {
    mergeIntoDocument?: boolean;
    repairTopology?: boolean;
}
export interface StepImportResult {
    success: boolean;
    document?: Document;
    path: string;
    error?: Error;
}
export declare class StepImporter {
    private readonly reader;
    private readonly fileReader;
    constructor(reader: StepReader | undefined, fileReader: FileReader);
    import(path: string, options?: StepImportOptions): Promise<StepImportResult>;
    importFromString(step: string): Document;
}
