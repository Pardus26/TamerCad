export type ReasoningType = "PHYSICS" | "DESIGN" | "MANUFACTURING" | "SAFETY" | "OPTIMIZATION";
export interface ReasoningRule {
    id: string;
    type: ReasoningType;
    condition: string;
    conclusion: string;
    priority: number;
}
export interface ReasoningInput {
    geometry: any;
    requirements: string[];
    constraints: string[];
}
export interface EngineeringConclusion {
    decision: string;
    explanation: string;
    confidence: number;
}
export interface ReasoningTrace {
    steps: string[];
}
export declare class BRepEngineeringReasoning {
    rules: ReasoningRule[];
    traces: ReasoningTrace[];
    conclusions: EngineeringConclusion[];
    active: boolean;
    constructor();
    /**
     * Varsayılan mühendislik kuralları
     */
    initializeRules(): void;
    /**
     * Kural ekleme
     */
    addRule(rule: ReasoningRule): void;
    /**
     * Fizik reasoning
     */
    reasonPhysics(input: any): {
        decision: string;
        confidence: number;
        steps: string[];
    };
    /**
     * Constraint reasoning
     */
    reasonConstraints(constraints: string[]): string[];
    /**
     * Üretim reasoning
     */
    reasonManufacturing(process: string): {
        decision: string;
        confidence: number;
    };
    /**
     * Tasarım değerlendirme
     */
    evaluateDesign(design: any): {
        score: number;
        acceptable: boolean;
    };
    /**
     * Ana reasoning motoru
     */
    reason(input: ReasoningInput): EngineeringConclusion;
    /**
     * Kararı açıkla
     */
    explain(conclusion: EngineeringConclusion): {
        why: string;
        confidence: number;
    };
    /**
     * Öğrenme hafızası
     */
    learn(experience: string): void;
    /**
     * İstatistik
     */
    statistics(): {
        rules: number;
        conclusions: number;
        traces: number;
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
        rules: number;
        status: string;
    };
}
