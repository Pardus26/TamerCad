export interface DesignCandidate {
    id: number;
    parameters: number[];
    mass: number;
    stress: number;
    cost: number;
    score: number;
}
export interface DesignConstraint {
    name: string;
    min?: number;
    max?: number;
    value?: number;
}
export interface GenerativeResult {
    success: boolean;
    candidates: number;
    best: DesignCandidate | null;
}
export interface DesignSpace {
    variables: number;
    ranges: number[][];
}
export declare class BRepGenerativeDesign {
    space: DesignSpace | null;
    constraints: DesignConstraint[];
    candidates: DesignCandidate[];
    population: number;
    constructor();
    /**
     * Design space tanımlama
     */
    defineSpace(space: DesignSpace): void;
    /**
     * Constraint ekleme
     */
    addConstraint(constraint: DesignConstraint): void;
    /**
     * Candidate üretimi
     */
    generateCandidates(count: number): void;
    /**
     * Aday değerlendirme
     */
    evaluateCandidates(): void;
    /**
     * Kütle hesabı
     */
    calculateMass(candidate: DesignCandidate): number;
    /**
     * Stress tahmini
     */
    calculateStress(candidate: DesignCandidate): number;
    /**
     * Maliyet
     */
    calculateCost(candidate: DesignCandidate): number;
    /**
     * Multi objective score
     */
    calculateScore(candidate: DesignCandidate): number;
    /**
     * En iyi tasarım seçimi
     */
    selectBest(): DesignCandidate | null;
    /**
     * AI search
     */
    optimizePopulation(generations: number): void;
    /**
     * Mutation
     */
    mutate(): void;
    /**
     * Manufacturing kontrolü
     */
    manufacturingCheck(candidate: DesignCandidate): {
        printable: boolean;
        machinable: boolean;
    };
    /**
     * Final generative çözüm
     */
    solve(): GenerativeResult;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        candidates: number;
        status: string;
    };
}
