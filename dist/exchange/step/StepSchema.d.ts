import { StepEntity } from "./StepEntity";
export type StepEntityConstructor<T extends StepEntity = StepEntity> = new (...args: any[]) => T;
export interface StepEntityDefinition {
    name: string;
    constructor?: StepEntityConstructor;
    supported: boolean;
    category: "geometry" | "topology" | "representation" | "product" | "assembly" | "annotation" | "other";
}
export declare class StepSchema {
    private readonly entities;
    constructor();
    register(definition: StepEntityDefinition): void;
    has(entityName: string): boolean;
    get(entityName: string): StepEntityDefinition | undefined;
    getAll(): StepEntityDefinition[];
    private registerDefaults;
}
