export type EngineeringAgentType = "CAD" | "CAE" | "CAM" | "DFM" | "OPTIMIZATION" | "MATERIAL" | "SAFETY";
export type AgentStatus = "IDLE" | "WORKING" | "DONE" | "FAILED";
export interface EngineeringAgent {
    id: string;
    name: string;
    type: EngineeringAgentType;
    expertise: string[];
    status: AgentStatus;
    confidence: number;
}
export interface AgentTask {
    id: string;
    description: string;
    assignedAgent?: string;
    result?: any;
}
export interface AgentOpinion {
    agent: string;
    recommendation: string;
    confidence: number;
}
export interface ConsensusResult {
    decision: string;
    agreement: number;
    opinions: AgentOpinion[];
}
export declare class BRepEngineeringAgentNetwork {
    agents: EngineeringAgent[];
    tasks: AgentTask[];
    opinions: AgentOpinion[];
    memory: any[];
    active: boolean;
    constructor();
    /**
     * Varsayılan AI mühendis ekibi
     */
    initializeAgents(): void;
    /**
     * Ajan kaydı
     */
    registerAgent(agent: EngineeringAgent): void;
    /**
     * Ajan bulma
     */
    findAgent(type: EngineeringAgentType): EngineeringAgent[];
    /**
     * Görev dağıtımı
     */
    distributeTask(task: AgentTask): AgentTask;
    /**
     * Ajan çalıştırma
     */
    executeAgent(agentId: string): {
        agent: string;
        recommendation: string;
        confidence: number;
    } | null;
    /**
     * Kolektif reasoning
     */
    collectiveReasoning(problem: string): {
        problem: string;
        opinions: AgentOpinion[];
    };
    /**
     * Consensus motoru
     */
    buildConsensus(): {
        decision: string;
        agreement: number;
        opinions: AgentOpinion[];
    };
    /**
     * Çatışma çözme
     */
    resolveConflict(opinions: AgentOpinion[]): {
        resolved: boolean;
        selected: AgentOpinion;
    };
    /**
     * Swarm öğrenmesi
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        agents: number;
        tasks: number;
        opinions: number;
        active: boolean;
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
        agents: number;
        status: string;
    };
}
