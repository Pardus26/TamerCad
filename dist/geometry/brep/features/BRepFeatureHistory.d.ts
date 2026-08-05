import { BRepFeature } from "./BRepFeature";
export type HistoryAction = "CREATE" | "UPDATE" | "DELETE" | "SUPPRESS" | "RESTORE" | "REBUILD";
export interface FeatureChange {
    id: string;
    featureId: string;
    action: HistoryAction;
    before: any;
    after: any;
    timestamp: number;
}
export interface FeatureSnapshot {
    version: number;
    features: any[];
    timestamp: number;
}
export interface TimelineEntry {
    version: number;
    description: string;
    features: string[];
}
export declare class BRepFeatureHistory {
    changes: FeatureChange[];
    snapshots: FeatureSnapshot[];
    undoStack: FeatureChange[];
    redoStack: FeatureChange[];
    timeline: TimelineEntry[];
    version: number;
    constructor();
    /**
     * Değişiklik kaydet
     */
    recordChange(change: FeatureChange): void;
    /**
     * Snapshot oluştur
     */
    createSnapshot(features: BRepFeature[]): {
        version: number;
        features: {
            id: string;
            name: string;
            type: import("./BRepFeature").BRepFeatureType;
            status: import("./BRepFeature").BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
        timestamp: number;
    };
    /**
     * Undo
     */
    undo(): false | {
        undone: boolean;
        feature: string;
        action: HistoryAction;
    };
    /**
     * Redo
     */
    redo(): false | {
        redone: boolean;
        feature: string;
        action: HistoryAction;
    };
    /**
     * Belirli versiyona git
     */
    restoreVersion(version: number): false | {
        restored: boolean;
        version: number;
    };
    /**
     * Feature geçmişi
     */
    getFeatureHistory(featureId: string): FeatureChange[];
    /**
     * Timeline
     */
    getTimeline(): TimelineEntry[];
    /**
     * Değişiklik analizi
     */
    analyzeEvolution(): {
        versions: number;
        created: number;
        updates: number;
        evolutionRate: number;
    };
    /**
     * AI öğrenme verisi
     */
    exportLearningData(): {
        history: FeatureChange[];
        snapshots: FeatureSnapshot[];
        timeline: TimelineEntry[];
    };
    /**
     * Geçmiş temizleme
     */
    clear(): void;
    /**
     * Serialize
     */
    serialize(): {
        version: number;
        changes: number;
        snapshots: number;
        timeline: number;
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        version: number;
        changes: number;
    };
}
