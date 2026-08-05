import { Command } from "./Command";
export declare enum SketchHistoryEventType {
    Create = "Create",
    Modify = "Modify",
    Delete = "Delete",
    Constraint = "Constraint",
    Transform = "Transform"
}
export interface SketchHistoryEntry {
    id: string;
    type: SketchHistoryEventType;
    description: string;
    command?: Command;
    entityIds: string[];
    timestamp: Date;
    metadata?: Record<string, any>;
}
export interface HistoryQuery {
    type?: SketchHistoryEventType;
    entityId?: string;
}
export declare class SketchHistory {
    private entries;
    add(entry: SketchHistoryEntry): void;
    recordCommand(command: Command, entityIds?: string[]): void;
    recordCreate(description: string, entityIds: string[]): void;
    recordDelete(description: string, entityIds: string[]): void;
    recordConstraint(description: string, constraintId: string): void;
    query(query: HistoryQuery): SketchHistoryEntry[];
    getEntry(id: string): SketchHistoryEntry | null;
    getTimeline(): SketchHistoryEntry[];
    size(): number;
    clear(): void;
    replay(): void;
}
