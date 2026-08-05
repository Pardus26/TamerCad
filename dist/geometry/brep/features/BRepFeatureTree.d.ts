import { BRepFeature, BRepFeatureStatus } from "./BRepFeature";
export interface FeatureTreeNode {
    feature: BRepFeature;
    index: number;
    active: boolean;
}
export interface FeatureHistory {
    version: number;
    feature: string;
    timestamp: number;
}
export interface RebuildReport {
    success: boolean;
    rebuilt: number;
    failed: string[];
}
export declare class BRepFeatureTree {
    root?: BRepFeature;
    features: BRepFeature[];
    history: FeatureHistory[];
    currentVersion: number;
    rollbackPoint: number;
    constructor();
    /**
     * Root feature belirleme
     */
    setRoot(feature: BRepFeature): void;
    /**
     * Feature ekleme
     */
    addFeature(feature: BRepFeature): BRepFeature;
    /**
     * Feature sırası
     */
    getTimeline(): {
        index: number;
        name: string;
        type: import("./BRepFeature").BRepFeatureType;
        status: BRepFeatureStatus;
    }[];
    /**
     * Feature bulma
     */
    findFeature(id: string): BRepFeature | undefined;
    /**
     * İsme göre arama
     */
    findByName(name: string): BRepFeature | undefined;
    /**
     * Dependency çözümleme
     */
    resolveDependencies(): {
        feature: string;
        dependencies: import("./BRepFeature").FeatureDependency[];
    }[];
    /**
     * Ağacı yeniden oluşturma
     */
    rebuild(): RebuildReport;
    /**
     * Belirli noktaya geri dön
     */
    rollback(version: number): {
        rollback: boolean;
        version: number;
    };
    /**
     * Son versiyona dön
     */
    rebuildLatest(): RebuildReport;
    /**
     * Feature bastır
     */
    suppressFeature(id: string): boolean;
    /**
     * Bastırılmış feature aç
     */
    restoreFeature(id: string): boolean;
    /**
     * Son feature
     */
    getLastFeature(): BRepFeature;
    /**
     * Tree snapshot
     */
    snapshot(): {
        version: number;
        features: {
            id: string;
            name: string;
            type: import("./BRepFeature").BRepFeatureType;
            status: BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
    };
    /**
     * Feature ağacı export
     */
    serialize(): {
        root: string | undefined;
        features: {
            id: string;
            name: string;
            type: import("./BRepFeature").BRepFeatureType;
            status: BRepFeatureStatus;
            parameters: import("./BRepFeature").FeatureParameter[];
            dependencies: import("./BRepFeature").FeatureDependency[];
        }[];
        history: FeatureHistory[];
    };
    /**
     * Tree temizleme
     */
    clear(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        featureCount: number;
        version: number;
    };
}
