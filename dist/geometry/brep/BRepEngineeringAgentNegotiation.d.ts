export type NegotiationState = "OPEN" | "DISCUSSION" | "COMPROMISE" | "AGREED" | "FAILED";
export interface AgentProposal {
    agent: string;
    objective: string;
    solution: string;
    advantages: string[];
    disadvantages: string[];
    confidence: number;
}
export interface EngineeringConstraint {
    name: string;
    value: any;
    priority: number;
}
export interface NegotiationResult {
    agreement: boolean;
    strategy: string;
    score: number;
    participants: string[];
}
export declare class BRepEngineeringAgentNegotiation {
    proposals: AgentProposal[];
    constraints: EngineeringConstraint[];
    state: NegotiationState;
    history: any[];
    constructor();
    /**
     * Müzakere başlatma
     */
    start(): void;
    /**
     * Teklif ekleme
     */
    addProposal(proposal: AgentProposal): void;
    /**
     * Kısıt ekleme
     */
    addConstraint(constraint: EngineeringConstraint): void;
    /**
     * Alternatif çözüm üretme
     */
    generateAlternatives(): {
        strategy: string;
        risk: string;
    }[];
    /**
     * Trade-off analizi
     */
    evaluateTradeoffs(): {
        agent: string;
        benefit: number;
        risk: number;
        score: number;
    }[];
    /**
     * Uzlaşma oluşturma
     */
    buildCompromise(): {
        agreement: boolean;
        strategy: string;
        score: number;
        participants: string[];
    };
    /**
     * Çözüm pazarlığı
     */
    negotiate(): {
        tradeoffs: {
            agent: string;
            benefit: number;
            risk: number;
            score: number;
        }[];
        compromise: {
            agreement: boolean;
            strategy: string;
            score: number;
            participants: string[];
        };
        state: "AGREED";
    };
    /**
     * En iyi strateji seçimi
     */
    selectStrategy(): AgentProposal | null;
    /**
     * Çatışma analizi
     */
    analyzeConflict(): {
        conflict: boolean;
        resolution: string;
    };
    /**
     * İnsan müdahalesi
     */
    humanDecision(decision: string): {
        accepted: boolean;
        decision: string;
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        state: NegotiationState;
        proposals: number;
        constraints: number;
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
        status: NegotiationState;
    };
}
