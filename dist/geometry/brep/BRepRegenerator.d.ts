import { BRepFeature } from "./BRepFeature";
import { BRepFeatureTree } from "./BRepFeatureTree";
export interface RegenerationOptions {
    incremental: boolean;
    stopOnError: boolean;
    rebuildFrom: number;
}
export interface RegenerationReport {
    success: boolean;
    rebuilt: number;
    failed: string[];
    warnings: string[];
}
export declare class BRepRegenerator {
    tree: BRepFeatureTree;
    constructor(tree: BRepFeatureTree);
    /**
     * Ana regeneration işlemi
     */
    regenerate(options: RegenerationOptions): RegenerationReport;
    /**
     * Dependency çözümü
     */
    resolveDependencies(): BRepFeature[];
    /**
     * Tek feature çalıştırma
     */
    executeFeature(feature: BRepFeature, options: RegenerationOptions): boolean;
    /**
     * Sadece değişen feature'ları güncelleme
     */
    incrementalUpdate(changed: BRepFeature[]): void;
    /**
     * History replay
     */
    replayHistory(): void;
    /**
     * Baştan rebuild
     */
    rebuildAll(): RegenerationReport;
    /**
     * Hata sonrası toparlama
     */
    recover(feature: BRepFeature): import("./BRepFeature").FeatureResult;
    /**
     * Regeneration durumu
     */
    status(): {
        total: number;
        valid: number;
    };
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
