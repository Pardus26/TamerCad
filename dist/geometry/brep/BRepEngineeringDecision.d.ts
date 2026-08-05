export type DecisionPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export interface DesignAlternative {
    id: string;
    name: string;
    performance: number;
    cost: number;
    risk: number;
    manufacturability: number;
}
export interface DecisionScore {
    alternative: string;
    score: number;
    explanation: string;
}
export interface EngineeringDecision {
    selected: string;
    reason: string;
    confidence: number;
    priority: DecisionPriority;
}
export interface RiskReport {
    risk: number;
    level: DecisionPriority;
    recommendation: string;
}
export declare class BRepEngineeringDecision {
    alternatives: DesignAlternative[];
    decisions: EngineeringDecision[];
    history: DecisionScore[];
    constructor();
    /**
     * Alternatif ekleme
     */
    addAlternative(alternative: DesignAlternative): void;
    /**
     * Performans skoru
     */
    calculateScore(design: DesignAlternative): number;
    /**
     * Alternatifleri sıralama
     */
    rankAlternatives(): {
        alternative: string;
        score: number;
        explanation: string;
    }[];
    /**
     * Risk analizi
     */
    evaluateRisk(design: DesignAlternative): RiskReport;
    /**
     * En iyi mühendislik kararını seçme
     */
    selectBest(): {
        selected: string;
        reason: string;
        confidence: number;
        priority: string;
    } | null;
    /**
     * Tasarım önerisi
     */
    recommend(design: DesignAlternative): {
        design: string;
        recommendation: string;
        risk: RiskReport;
    };
    /**
     * İnsan onayı
     */
    approve(decision: EngineeringDecision): {
        approved: boolean;
        decision: string;
        timestamp: number;
    };
    /**
     * Karar hafızası
     */
    remember(decision: string): void;
    /**
     * İstatistik
     */
    statistics(): {
        alternatives: number;
        decisions: number;
        history: number;
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
        alternatives: number;
        status: string;
    };
}
