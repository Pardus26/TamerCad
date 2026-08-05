import { Document } from "../core/Document";
export interface ProjectMetadata {
    id: string;
    name: string;
    description?: string;
    author?: string;
    company?: string;
    createdAt: Date;
    modifiedAt: Date;
    version: string;
}
export interface ProjectSettings {
    autoSave: boolean;
    autoSaveInterval: number;
    defaultLengthUnit: "mm" | "cm" | "m" | "inch";
    defaultAngleUnit: "deg" | "rad";
}
export declare class Project {
    readonly metadata: ProjectMetadata;
    readonly settings: ProjectSettings;
    private documents;
    private activeDocumentId;
    private properties;
    constructor(name: string);
    addDocument(document: Document): void;
    removeDocument(id: string): boolean;
    getDocument(id: string): Document | null;
    getDocuments(): Document[];
    getActiveDocument(): Document | null;
    setActiveDocument(id: string): boolean;
    setProperty(key: string, value: any): void;
    getProperty(key: string): any;
    getProperties(): Record<string, any>;
    touch(): void;
    toJSON(): {
        metadata: ProjectMetadata;
        settings: ProjectSettings;
        activeDocumentId: string | null;
        documents: {
            metadata: import("../core/Document").DocumentMetadata;
            units: import("../core/Document").DocumentUnits;
            properties: Record<string, any>;
        }[];
        properties: Record<string, any>;
    };
}
