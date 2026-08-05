import { BRepFeature } from "./BRepFeature";
export interface FeatureTreeNode {
    feature: BRepFeature;
    index: number;
    suppressed: boolean;
    children: FeatureTreeNode[];
}
export interface RegenerationResult {
    success: boolean;
    regenerated: number;
    failed: string[];
}
export declare class BRepFeatureTree {
    root: BRepFeature | null;
    nodes: FeatureTreeNode[];
    constructor();
    /**
     * Root feature oluşturma
     */
    setRoot(feature: BRepFeature): void;
    /**
     * Feature ekleme
     */
    add(feature: BRepFeature): FeatureTreeNode;
    /**
     * Parent-child bağlantısı
     */
    link(parent: BRepFeature, child: BRepFeature): void;
    /**
     * Timeline sırası
     */
    timeline(): BRepFeature[];
    /**
     * Feature bulma
     */
    find(id: string): BRepFeature | null;
    /**
     * Suppress feature
     */
    suppress(id: string): void;
    /**
     * Unsuppress
     */
    unsuppress(id: string): void;
    /**
     * Rollback
     *
     * Belirli feature sonrası dur
     */
    rollback(index: number): void;
    /**
     * Regeneration sırası
     */
    regenerate(): RegenerationResult;
    /**
     * Dependency sıralaması
     */
    dependencyOrder(): FeatureTreeNode[];
    /**
     * Tree görüntüsü
     */
    structure(): {
        id: string;
        name: string;
        type: import("./BRepFeature").FeatureType;
        suppressed: boolean;
    }[];
    /**
     * Feature sayısı
     */
    count(): number;
    /**
     * Clone
     */
    clone(): BRepFeatureTree;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
