export type ConsensusMethod = "MAJORITY" | "WEIGHTED" | "CONFIDENCE" | "EXPERT";
export interface AgentOpinion {
    agent: string;
    expertise: string;
    decision: string;
    confidence: number;
    evidence: any;
}
export interface ConsensusDecision {
    decision: string;
    confidence: number;
    agreement: number;
    supporters: string[];
    rejected: string[];
}
export interface ConsensusSession {
    id: string;
    topic: string;
    opinions: AgentOpinion[];
    result?: ConsensusDecision;
}
export declare class BRepEngineeringAgentConsensus {
    opinions: AgentOpinion[];
    sessions: ConsensusSession[];
    method: ConsensusMethod;
    memory: any[];
    constructor();
    /**
     * Konsensus yöntemi
     */
    setMethod(method: ConsensusMethod): void;
    /**
     * Ajan görüşü ekleme
     */
    addOpinion(opinion: AgentOpinion): void;
    /**
     * Görüş toplama
     */
    collect(opinions: AgentOpinion[]): AgentOpinion[];
    /**
     * Güven ağırlıklı hesap
     */
    calculateConfidence(): number;
    /**
     * Oylama
     */
    vote(): [string, unknown];
    /**
     * Uzman sıralama
     */
    rankExperts(): AgentOpinion[];
    /**
     * Çatışma çözme
     */
    resolveConflict(): {
        resolved: boolean;
        selected: AgentOpinion;
    };
    /**
     * Nihai karar üretme
     */
    buildDecision(): ConsensusDecision;
    /**
     * Konsensus oturumu
     */
    createSession(topic: string): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        topic: string;
        opinions: never[];
    };
    /**
     * Oturum çalıştırma
     */
    runSession(topic: string): {
        id: `${string}-${string}-${string}-${string}-${string}`;
        topic: string;
        opinions: never[];
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        method: ConsensusMethod;
        opinions: number;
        sessions: number;
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
        status: string;
    };
}
