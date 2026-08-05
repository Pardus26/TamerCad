export type MLModelType = "NEURAL_NETWORK" | "RANDOM_FOREST" | "GRAPH_NETWORK" | "TRANSFORMER";
export interface GeometryFeature {
    name: string;
    value: number;
}
export interface GeometryEmbedding {
    vector: number[];
    dimension: number;
}
export interface MLTrainingData {
    features: number[];
    label: number;
}
export interface MLModel {
    id: string;
    type: MLModelType;
    version: string;
    trained: boolean;
}
export interface MLPrediction {
    value: number;
    confidence: number;
}
export declare class BRepMachineLearning {
    model: MLModel;
    dataset: MLTrainingData[];
    features: GeometryFeature[];
    embeddings: GeometryEmbedding[];
    learningEnabled: boolean;
    constructor();
    /**
     * Model tipi
     */
    setModel(type: MLModelType): void;
    /**
     * BRep feature extraction
     */
    extractFeatures(brep: any): GeometryFeature[];
    /**
     * Geometry embedding
     */
    createEmbedding(): {
        vector: number[];
        dimension: number;
    };
    /**
     * Training data ekleme
     */
    addTrainingData(data: MLTrainingData): void;
    /**
     * Model training
     */
    train(): boolean;
    /**
     * Prediction
     */
    predict(input: number[]): MLPrediction;
    /**
     * Üretilebilirlik tahmini
     */
    predictManufacturability(features: number[]): {
        manufacturable: boolean;
        confidence: number;
    };
    /**
     * Benzer geometri arama
     */
    findSimilar(embedding: GeometryEmbedding): GeometryEmbedding[];
    /**
     * Continuous learning
     */
    learn(result: number): void;
    /**
     * Model güncelleme
     */
    updateModel(): void;
    /**
     * Model durumu
     */
    status(): {
        model: MLModelType;
        trained: boolean;
        samples: number;
        embeddings: number;
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
        model: MLModelType;
        version: string;
        status: string;
    };
}
