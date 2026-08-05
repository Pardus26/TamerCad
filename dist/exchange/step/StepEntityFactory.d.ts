import { StepEntity } from "./StepEntity";
export declare class StepEntityFactory {
    create(id: number, type: string, parameters: string[]): StepEntity;
    private reference;
    private referenceArray;
    private referenceList;
    private number;
    private boolean;
    private string;
}
