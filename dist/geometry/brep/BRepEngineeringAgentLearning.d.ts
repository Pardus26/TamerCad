export type LearningMode = "SUPERVISED" | "REINFORCEMENT" | "EXPERIENCE" | "ADAPTIVE";
export interface AgentExperience {
    id: string;
    agent: string;
    task: string;
    action: string;
    result: any;
    reward: number;
    success: boolean;
}
export interface AgentPerformance {
    agent: string;
    successRate: number;
    averageReward: number;
    improvements: string[];
}
export interface LearningUpdate {
    knowledge: string;
    change: string;
    confidence: number;
}
export declare class BRepEngineeringAgentLearning {
    experiences: AgentExperience[];
    performance: AgentPerformance[];
    knowledge: any[];
    updates: LearningUpdate[];
    mode: LearningMode;
    constructor();
    /**
     * Öğrenme modu
     */
    setMode(mode: LearningMode): void;
    /**
     * Deneyim kaydetme
     */
    recordExperience(experience: AgentExperience): AgentExperience;
    /**
     * Execution sonucundan öğrenme
     */
    learnFromExecution(execution: any): AgentExperience;
    /**
     * Ödül hesaplama
     */
    calculateReward(success: boolean, quality: number): number;
    /**
     * Performans analizi
     */
    analyzePerformance(agent: string): AgentPerformance;
    /**
     * Pattern keşfi
     */
    extractPatterns(): {
        patterns: string[];
        count: number;
    };
    /**
     * Bilgi güncelleme
     */
    updateKnowledge(knowledge: string, change: string): {
        knowledge: string;
        change: string;
        confidence: number;
    };
    /**
     * Ajan davranış adaptasyonu
     */
    adaptAgent(agent: string): {
        agent: string;
        adaptation: string;
        confidence: number;
    };
    /**
     * Reinforcement loop
     */
    reinforcementLoop(): {
        totalReward: number;
        improvement: string;
    };
    /**
     * En iyi deneyimleri seçme
     */
    bestExperiences(): AgentExperience[];
    /**
     * Bilgi paylaşımı
     */
    shareLearning(): {
        shared: boolean;
        agents: string[];
    };
    /**
     * Öğrenme döngüsü
     */
    evolve(): {
        patterns: {
            patterns: string[];
            count: number;
        };
        reinforcement: {
            totalReward: number;
            improvement: string;
        };
        evolved: boolean;
    };
    /**
     * Durum
     */
    status(): {
        mode: LearningMode;
        experiences: number;
        knowledge: number;
        updates: number;
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
        status: string;
    };
}
