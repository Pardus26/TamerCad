import { BRepFeature } from "./BRepFeature";
export interface DependencyNode {
    featureId: string;
    parents: string[];
    children: string[];
}
export interface DependencyResult {
    valid: boolean;
    order: string[];
    cycles: string[][];
}
export declare class BRepFeatureDependency {
    nodes: Map<string, DependencyNode>;
    cache: Map<string, string[]>;
    constructor();
    /**
     * Feature node oluştur
     */
    registerFeature(feature: BRepFeature): void;
    /**
     * Dependency ekle
     */
    addDependency(parentId: string, childId: string): void;
    /**
     * Dependency sil
     */
    removeDependency(parentId: string, childId: string): void;
    /**
     * Parent getir
     */
    getParents(featureId: string): string[];
    /**
     * Child getir
     */
    getChildren(featureId: string): string[];
    /**
     * Recursive dependency
     */
    collectDependencies(featureId: string, visited?: Set<string>): string[];
    /**
     * Cycle detection
     */
    detectCycles(): string[][];
    /**
     * Build sırası
     */
    getBuildOrder(): string[];
    /**
     * Validation
     */
    validate(): DependencyResult;
    /**
     * Cache reset
     */
    invalidateCache(): void;
    /**
     * Serialize
     */
    serialize(): {
        nodes: DependencyNode[];
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        nodes: number;
        order: number;
    };
}
