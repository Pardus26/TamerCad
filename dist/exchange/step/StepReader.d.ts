import { Document } from "../../persistence/core/Document";
export declare class StepReader {
    private readonly parser;
    read(stepContent: string): Document;
}
