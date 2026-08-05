import { BRepModel } from "../../topology/brep/BRepModel";
import { FeatureTree } from "../../modeling/feature/FeatureTree";
import { SketchManager } from "../../modeling/sketch/SketchManager";
export interface DocumentMetadata {
    id: string;
    name: string;
    author?: string;
    company?: string;
    description?: string;
    createdAt: Date;
    modifiedAt: Date;
    version: string;
}
export interface DocumentUnits {
    length: "mm" | "cm" | "m" | "inch";
    angle: "deg" | "rad";
}
export declare class Document {
    readonly metadata: DocumentMetadata;
    readonly brep: BRepModel;
    readonly featureTree: FeatureTree;
    readonly sketches: SketchManager;
    readonly units: DocumentUnits;
    private customProperties;
    constructor(name: string);
    rename(name: string): void;
    touch(): void;
    setProperty(key: string, value: any): void;
    getProperty(key: string): any;
    removeProperty(key: string): boolean;
    getProperties(): Record<string, any>;
    clear(): void;
    toJSON(): {
        metadata: DocumentMetadata;
        units: DocumentUnits;
        properties: Record<string, any>;
    };
}
