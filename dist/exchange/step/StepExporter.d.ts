import { Document } from "../../persistence/core/Document";
import { StepWriter } from "./StepWriter";
import { FileWriter } from "../../persistence/io/FileWriter";
export interface StepExportOptions {
    overwrite?: boolean;
    includeHiddenGeometry?: boolean;
    schema?: "AP203" | "AP214" | "AP242";
}
export interface StepExportResult {
    success: boolean;
    path: string;
    bytesWritten: number;
    error?: Error;
}
export declare class StepExporter {
    private readonly writer;
    private readonly fileWriter;
    constructor(writer: StepWriter | undefined, fileWriter: FileWriter);
    export(document: Document, path: string, options?: StepExportOptions): Promise<StepExportResult>;
    exportToString(document: Document): string;
}
