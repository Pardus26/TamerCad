export type AgentRole = "DESIGN" | "SIMULATION" | "OPTIMIZATION" | "MANUFACTURING" | "VALIDATION";
export type CollectiveState = "FORMING" | "COLLABORATING" | "REASONING" | "DECIDING" | "COMPLETED";
export interface CollectiveAgent {
    id: string;
    role: AgentRole;
    expertise: string[];
    performance: number;
    active: boolean;
}
export interface CollectiveDecision {
    decision: string;
    contributors: string[];
    confidence: number;
}
export interface SharedKnowledge {
    source: string;
    information: any;
    reliability: number;
}
export declare class BRepEngineeringAgentCollective {
    agents: CollectiveAgent[];
    knowledge: SharedKnowledge[];
    decisions: CollectiveDecision[];
    memory: any[];
    state: CollectiveState;
    constructor();
    /**
     * Ajan ekleme
     */
    addAgent(agent: CollectiveAgent): CollectiveAgent;
    /**
     * Takım oluşturma
     */
    formTeam(agents: CollectiveAgent[]): {
        teamSize: number;
        formed: boolean;
    };
    /**
     * Rol dağıtımı
     */
    assignRoles(): {
        agent: string;
        role: AgentRole;
    }[];
    /**
     * Ortak bilgi paylaşımı
     */
    shareKnowledge(knowledge: SharedKnowledge): {
        shared: boolean;
        source: string;
    };
    /**
     * Kolektif akıl yürütme
     */
    collectiveReasoning(problem: string): {
        problem: string;
        contributors: string[];
        reasoning: string;
    };
    /**
     * Swarm optimizasyonu
     */
    swarmOptimize(objective: string): {
        objective: string;
        agents: number;
        optimized: boolean;
        score: number;
    };
    /**
     * Kolektif karar
     */
    makeDecision(decision: string): CollectiveDecision;
    /**
     * Ajanlar arası müzakere
     */
    negotiate(): {
        agreement: boolean;
        participants: number;
        strategy: string;
    };
    /**
     * Kolektif performans
     */
    evaluateTeam(): {
        teamPerformance: number;
    };
    /**
     * Kolektif hafıza
     */
    remember(experience: any): void;
    /**
     * Kolektif öğrenme
     */
    collectiveLearning(): {
        learned: boolean;
        knowledge: number;
        agents: number;
    };
    /**
     * Çalışma döngüsü
     */
    runCollectiveCycle(problem: string): {
        reasoning: {
            problem: string;
            contributors: string[];
            reasoning: string;
        };
        optimization: {
            objective: string;
            agents: number;
            optimized: boolean;
            score: number;
        };
        decision: CollectiveDecision;
    };
    /**
     * Durum
     */
    status(): {
        state: CollectiveState;
        agents: number;
        knowledge: number;
        decisions: number;
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
        state: CollectiveState;
    };
}
