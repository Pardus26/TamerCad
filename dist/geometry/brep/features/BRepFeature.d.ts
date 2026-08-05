export type BRepFeatureType = "SKETCH" | "EXTRUDE" | "REVOLVE" | "POCKET" | "HOLE" | "FILLET" | "CHAMFER" | "PATTERN" | "SHELL" | "CUSTOM";
export type BRepFeatureStatus = "CREATED" | "VALID" | "FAILED" | "SUPPRESSED";
export interface FeatureParameter {
    name: string;
    value: any;
    expression?: string;
}
export interface FeatureDependency {
    id: string;
    type: string;
}
export interface FeatureResult {
    success: boolean;
    shape?: any;
    error?: string;
}
export declare abstract class BRepFeature {
    id: string;
    name: string;
    type: BRepFeatureType;
    status: BRepFeatureStatus;
    parameters: FeatureParameter[];
    dependencies: FeatureDependency[];
    parent?: BRepFeature;
    children: BRepFeature[];
    createdAt: number;
    updatedAt: number;
    constructor(id: string, name: string, type: BRepFeatureType);
    /**
     * Feature hesaplama
     */
    abstract rebuild(): FeatureResult;
    /**
     * Parametre ekleme
     */
    addParameter(parameter: FeatureParameter): void;
    /**
     * Parametre güncelleme
     */
    updateParameter(name: string, value: any): boolean;
    /**
     * Bağımlılık ekleme
     */
    addDependency(dependency: FeatureDependency): void;
    /**
     * Alt feature ekleme
     */
    addChild(feature: BRepFeature): void;
    /**
     * Feature geçerli mi?
     */
    validate(): boolean;
    /**
     * Feature bastırma
     */
    suppress(): void;
    /**
     * Yeniden oluşturma
     */
    rebuildTree(): FeatureResult;
    /**
     * Değişim zamanı
     */
    protected touch(): void;
    /**
     * Serialize
     */
    serialize(): {
        id: string;
        name: string;
        type: BRepFeatureType;
        status: BRepFeatureStatus;
        parameters: FeatureParameter[];
        dependencies: FeatureDependency[];
    };
    /**
     * Debug
     */
    info(): {
        feature: string;
        type: BRepFeatureType;
        status: BRepFeatureStatus;
    };
}
