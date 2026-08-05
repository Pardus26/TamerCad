import { StepEntity } from "./StepEntity";
export interface StepHeader {
    fileDescription?: string;
    fileName?: string;
    fileSchema?: string;
}
export interface StepModel {
    header: StepHeader;
    entities: StepEntity[];
    fileName?: string;
}
export declare class StepParser {
    private readonly schema;
    private readonly factory;
    parse(content: string): StepModel;
    private parseHeader;
    private parseEntities;
    private tokenize;
    private extractFileName;
}
