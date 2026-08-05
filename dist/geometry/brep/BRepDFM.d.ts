export type DFMProcess = "CNC" | "3D_PRINT" | "CASTING" | "INJECTION";
export interface DFMRule {
    id: string;
    name: string;
    severity: "INFO" | "WARNING" | "ERROR";
}
export interface DFMIssue {
    rule: string;
    message: string;
    severity: string;
}
export interface DFMReport {
    score: number;
    manufacturable: boolean;
    issues: DFMIssue[];
    recommendations: string[];
}
export interface FeatureInfo {
    type: string;
    size: number;
    complexity: number;
}
export declare class BRepDFM {
    process: DFMProcess;
    rules: DFMRule[];
    issues: DFMIssue[];
    features: FeatureInfo[];
    constructor();
    /**
     * Üretim yöntemi
     */
    setProcess(process: DFMProcess): void;
    /**
     * Kural ekleme
     */
    addRule(rule: DFMRule): void;
    /**
     * Feature analizi
     */
    analyzeFeatures(): FeatureInfo[];
    /**
     * Feature ekleme
     */
    addFeature(feature: FeatureInfo): void;
    /**
     * Ana DFM analizi
     */
    analyze(): DFMReport;
    /**
     * Rule kontrolü
     */
    checkRules(): void;
    /**
     * Karmaşıklık analizi
     */
    checkComplexity(): void;
    /**
     * Üretim kontrolü
     */
    checkManufacturing(): void;
    /**
     * CNC kuralları
     */
    checkCNC(): void;
    /**
     * 3D print kuralları
     */
    check3DPrint(): void;
    /**
     * Döküm kontrolü
     */
    checkCasting(): void;
    /**
     * DFM skoru
     */
    calculateScore(): number;
    /**
     * Öneri üretme
     */
    generateRecommendations(): string[];
    /**
     * Maliyet tahmini
     */
    estimateManufacturingCost(): {
        material: number;
        machining: number;
        assembly: number;
        total: number;
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
        process: DFMProcess;
        features: number;
        status: string;
    };
}
