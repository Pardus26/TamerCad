import { Document } from "../../persistence/core/Document";
export declare class StepWriter {
    write(document: Document): string;
    private fileDescription;
    private fileName;
    private fileSchema;
    private writeGeometry;
}
