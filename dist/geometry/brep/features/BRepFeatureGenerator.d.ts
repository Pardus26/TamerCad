import { BRepFeature, BRepFeatureType } from "./BRepFeature";
export interface GeneratedFeature {
    id: string;
    type: BRepFeatureType;
    parameters: any;
    dependencies: string[];
    feature?: BRepFeature;
}
export interface FeatureTemplate {
    type: BRepFeatureType;
    defaultParameters: any;
}
export declare class BRepFeatureGenerator {
    templates: FeatureTemplate[];
    generated: GeneratedFeature[];
    constructor();
    /**
     * Template bul
     */
    findTemplate(type: BRepFeatureType): FeatureTemplate | undefined;
    /**
     * Parametre oluştur
     */
    buildParameters(type: BRepFeatureType, input: any): any;
    /**
     * Extrude üret
     */
    generateExtrude(parameters: any): GeneratedFeature;
    /**
     * Hole üret
     */
    generateHole(parameters: any): GeneratedFeature;
    /**
     * Fillet üret
     */
    generateFillet(parameters: any): GeneratedFeature;
    /**
     * Chamfer üret
     */
    generateChamfer(parameters: any): GeneratedFeature;
    /**
     * Pattern üret
     */
    generatePattern(parameters: any): GeneratedFeature;
    /**
     * Genel feature üretici
     */
    generate(type: BRepFeatureType, parameters: any): GeneratedFeature;
    /**
     * Recognizer çıktısını CAD feature'a çevir
     */
    generateFromRecognition(recognition: any): GeneratedFeature;
    /**
     * Feature zinciri oluştur
     */
    generateFeatureChain(recognitions: any[]): GeneratedFeature[];
    /**
     * Dependency bağlama
     */
    bindDependency(featureId: string, dependencyId: string): boolean;
    /**
     * AI reconstruction datası
     */
    exportReconstructionData(): {
        generated: GeneratedFeature[];
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
        templates: number;
        generated: number;
    };
}
