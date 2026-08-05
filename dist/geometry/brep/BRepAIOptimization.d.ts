export type AIOptimizer = "GENETIC" | "REINFORCEMENT" | "NEURAL" | "BAYESIAN";
export interface TrainingSample {
    input: number[];
    output: number;
    quality: number;
}
export interface AICandidate {
    parameters: number[];
    prediction: number;
    reward: number;
}
export interface AIOptimizationResult {
    best: AICandidate | null;
    iterations: number;
    improvement: number;
}
export interface AIModelState {
    trained: boolean;
    samples: number;
    accuracy: number;
}
export declare class BRepAIOptimization {
    optimizer: AIOptimizer;
    samples: TrainingSample[];
    candidates: AICandidate[];
    learningRate: number;
    trained: boolean;
    constructor();
    /**
     * Optimizer seçimi
     */
    setOptimizer(optimizer: AIOptimizer): void;
    /**
     * Training data ekleme
     */
    addSample(sample: TrainingSample): void;
    /**
     * Model eğitimi
     */
    train(): boolean;
    /**
     * Feature encoding
     */
    encodeFeatures(parameters: number[]): number[];
    /**
     * Surrogate prediction
     */
    predict(parameters: number[]): number;
    /**
     * Candidate üretimi
     */
    generateCandidates(count: number): void;
    /**
     * Reward hesaplama
     */
    evaluateReward(): void;
    /**
     * Reinforcement search
     */
    learn(): void;
    /**
     * AI optimizasyon döngüsü
     */
    optimize(iterations: number): AIOptimizationResult;
    /**
     * Mutation
     */
    mutate(): void;
    /**
     * AI model durumu
     */
    status(): AIModelState;
    /**
     * Simulation feedback
     */
    updateFromSimulation(result: any): void;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        optimizer: AIOptimizer;
        samples: number;
        status: string;
    };
}
