import { Feature } from "./Feature";
import { FeatureTree } from "./FeatureTree";
export interface FeatureManagerResult {
    success: boolean;
    message?: string;
}
export declare class FeatureManager {
    tree: FeatureTree;
    constructor();
    addFeature(feature: Feature): FeatureManagerResult;
    removeFeature(id: string): FeatureManagerResult;
    activateFeature(id: string): boolean;
    getActiveFeature(): Feature | null;
    rebuild(): void;
    update(): void;
    rollback(featureId: string): Feature | null;
    getFeatures(): Feature[];
    getFeatureCount(): number;
    clear(): void;
}
