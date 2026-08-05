export type NeuralModel = "AUTOENCODER" | "GRAPH_NEURAL_NETWORK" | "DIFFUSION_MODEL" | "TRANSFORMER";
export interface NeuralVector {
    values: number[];
    dimension: number;
}
export interface NeuralShape {
    id: string;
    latent: NeuralVector;
    geometry: any;
}
export interface GenerationResult {
    success: boolean;
    similarity: number;
    geometry: any;
}
export interface NeuralModelState {
    trained: boolean;
    samples: number;
    version: string;
}
export declare class BRepNeuralGeometry {
    model: NeuralModel;
    shapes: NeuralShape[];
    trainingSamples: any[];
    latentSpace: NeuralVector[];
    trained: boolean;
    constructor();
    /**
     * Neural model seçimi
     */
    setModel(model: NeuralModel): void;
    /**
     * BRep geometry encoding
     */
    encode(geometry: any): NeuralVector;
    /**
     * Latent space oluşturma
     */
    createLatentSpace(): {
        size: number;
        dimension: number;
    };
    /**
     * Eğitim datası ekleme
     */
    addTrainingShape(geometry: any): void;
    /**
     * Neural training
     */
    train(): boolean;
    /**
     * Geometry decode
     */
    decode(latent: NeuralVector): {
        faces: number;
        edges: number;
        volume: number;
        area: number;
    };
    /**
     * Yeni geometri üretimi
     */
    generate(parameters: number[]): GenerationResult;
    /**
     * Shape interpolation
     */
    interpolate(a: NeuralVector, b: NeuralVector, t: number): {
        values: number[];
        dimension: number;
    };
    /**
     * Benzer şekil arama
     */
    findSimilar(latent: NeuralVector): NeuralShape[];
    /**
     * Neural CAD operasyonu
     */
    neuralOperation(operation: string): {
        operation: string;
        generated: boolean;
        model: NeuralModel;
    };
    /**
     * Tasarım iyileştirme
     */
    optimizeShape(geometry: any): GenerationResult;
    /**
     * Model durumu
     */
    status(): NeuralModelState;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        model: NeuralModel;
        trained: boolean;
        status: string;
    };
}
