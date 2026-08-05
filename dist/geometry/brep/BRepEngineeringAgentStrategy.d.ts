export type StrategyPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type StrategyStatus = "PLANNED" | "EXECUTING" | "ADAPTING" | "COMPLETED";
export interface EngineeringGoal {
    id: string;
    name: string;
    target: string;
    priority: StrategyPriority;
}
export interface StrategyPlan {
    objective: string;
    steps: string[];
    resources: string[];
    risks: string[];
    confidence: number;
}
export interface EngineeringRoadmap {
    phases: string[];
    duration: number;
    milestones: string[];
}
export declare class BRepEngineeringAgentStrategy {
    goals: EngineeringGoal[];
    strategies: StrategyPlan[];
    roadmap: EngineeringRoadmap | null;
    status: StrategyStatus;
    memory: any[];
    constructor();
    /**
     * Hedef ekleme
     */
    addGoal(goal: EngineeringGoal): void;
    /**
     * Hedef parçalama
     */
    decomposeGoal(goal: EngineeringGoal): string[];
    /**
     * Strateji üretme
     */
    generateStrategy(objective: string): StrategyPlan;
    /**
     * Kaynak dağıtımı
     */
    allocateResources(resources: string[]): {
        allocated: string[];
        efficiency: number;
    };
    /**
     * Risk analizi
     */
    analyzeRisk(strategy: StrategyPlan): {
        risks: string[];
        mitigation: string[];
    };
    /**
     * Yol haritası oluşturma
     */
    buildRoadmap(strategy: StrategyPlan): EngineeringRoadmap;
    /**
     * Strateji yürütme
     */
    execute(): {
        executed: boolean;
        strategies: number;
    };
    /**
     * Adaptif strateji
     */
    adapt(feedback: any): {
        changed: boolean;
        reason: any;
    };
    /**
     * En iyi strateji seçimi
     */
    selectBest(): StrategyPlan;
    /**
     * Uzun vadeli plan
     */
    createLongTermStrategy(vision: string): {
        vision: string;
        roadmap: string[];
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    statusReport(): {
        status: StrategyStatus;
        goals: number;
        strategies: number;
        memory: number;
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
        status: StrategyStatus;
    };
}
