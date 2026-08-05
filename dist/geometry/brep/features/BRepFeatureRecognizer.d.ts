import { BRepFeatureType } from "./BRepFeature";
export type GeometryType = "PLANE" | "CYLINDER" | "CONE" | "SPHERE" | "TORUS" | "UNKNOWN";
export interface GeometryEntity {
    id: string;
    type: GeometryType;
    area?: number;
    radius?: number;
    normal?: any;
    data?: any;
}
export interface RecognizedFeature {
    type: BRepFeatureType;
    confidence: number;
    parameters: any;
    entities: string[];
}
export interface RecognitionResult {
    success: boolean;
    features: RecognizedFeature[];
}
export declare class BRepFeatureRecognizer {
    entities: GeometryEntity[];
    recognized: RecognizedFeature[];
    confidenceThreshold: number;
    constructor();
    /**
     * Geometri ekleme
     */
    addEntity(entity: GeometryEntity): void;
    /**
     * Yüzey tipi analizi
     */
    classifySurface(entity: GeometryEntity): GeometryType;
    /**
     * Silindirik yüzey algılama
     */
    detectCylinder(entity: GeometryEntity): {
        type: string;
        confidence: number;
        parameters: {
            radius: number | undefined;
        };
        entities: string[];
    } | null;
    /**
     * Düz yüzey algılama
     */
    detectExtrude(entity: GeometryEntity): {
        type: string;
        confidence: number;
        parameters: {
            direction: any;
        };
        entities: string[];
    } | null;
    /**
     * Yuvarlatılmış kenar algılama
     */
    detectFillet(entity: any): {
        type: string;
        confidence: number;
        parameters: {
            radius: any;
        };
        entities: any[];
    } | null;
    /**
     * Chamfer algılama
     */
    detectChamfer(entity: any): {
        type: string;
        confidence: number;
        parameters: {
            angle: any;
        };
        entities: any[];
    } | null;
    /**
     * Pattern algılama
     */
    detectPattern(entities: GeometryEntity[]): {
        type: string;
        confidence: number;
        parameters: {
            count: number;
        };
        entities: string[];
    } | null;
    /**
     * Tüm feature analizi
     */
    recognize(): {
        success: boolean;
        features: RecognizedFeature[];
    };
    /**
     * Feature ağacı üretme
     */
    generateFeatureTree(): {
        id: string;
        type: BRepFeatureType;
        parameters: any;
    }[];
    /**
     * AI eğitim datası
     */
    exportTrainingData(): {
        entities: GeometryEntity[];
        recognized: RecognizedFeature[];
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
        entities: number;
        features: number;
    };
}
