export type GenerativeStrategy = "EVOLUTIONARY" | "DIFFUSION" | "REINFORCEMENT" | "LANGUAGE_GUIDED";
export interface DesignIntent {
    description: string;
    objectives: string[];
    constraints: string[];
}
export interface GeneratedDesign {
    id: string;
    geometry: any;
    score: number;
    manufacturable: boolean;
}
export interface AIConstraint {
    name: string;
    value: number;
    active: boolean;
}
export interface GenerativeResult {
    success: boolean;
    designs: number;
    best: GeneratedDesign | null;
}
export declare class BRepGenerativeAI {
    strategy: GenerativeStrategy;
    intents: DesignIntent[];
    designs: GeneratedDesign[];
    constraints: AIConstraint[];
    learningEnabled: boolean;
    constructor();
    /**
     * AI stratejisi
     */
    setStrategy(strategy: GenerativeStrategy): void;
    /**
     * Tasarım niyeti ekleme
     */
    addIntent(intent: DesignIntent): void;
    /**
     * Doğal dil tasarım analizi
     */
    parseIntent(text: string): DesignIntent;
    /**
     * Kısıt ekleme
     */
    addConstraint(constraint: AIConstraint): void;
    /**
     * AI geometri üretimi
     */
    generateGeometry(): {
        type: string;
        faces: number;
        optimized: boolean;
    };
    /**
     * Yeni tasarım oluşturma
     */
    createDesign(): GeneratedDesign;
    /**
     * Çoklu jenerasyon
     */
    generatePopulation(size: number): GeneratedDesign[];
    /**
     * Simülasyon feedback
     */
    evaluateDesigns(simulationResults: any[]): void;
    /**
     * Evrimsel optimizasyon
     */
    evolve(): void;
    /**
     * Üretilebilirlik kontrolü
     */
    checkManufacturing(design: GeneratedDesign): {
        approved: boolean;
        warnings: never[];
    };
    /**
     * Autonomous design loop
     */
    autonomousDesign(generations: number): GenerativeResult;
    /**
     * AI durum
     */
    status(): {
        strategy: GenerativeStrategy;
        designs: number;
        intents: number;
        autonomous: boolean;
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
        strategy: GenerativeStrategy;
        status: string;
    };
}
