export type EngineeringRole = "CAD_ENGINEER" | "CAE_ENGINEER" | "MANUFACTURING_ENGINEER" | "SYSTEM_ENGINEER";
export interface EngineeringRequest {
    problem: string;
    objectives: string[];
    constraints: string[];
}
export interface EngineeringDecision {
    category: string;
    recommendation: string;
    confidence: number;
}
export interface KnowledgeEntry {
    topic: string;
    information: string;
}
export interface AgentResponse {
    answer: string;
    decisions: EngineeringDecision[];
    confidence: number;
}
export declare class BRepEngineeringAgent {
    role: EngineeringRole;
    knowledge: KnowledgeEntry[];
    requests: EngineeringRequest[];
    decisions: EngineeringDecision[];
    memory: string[];
    constructor();
    /**
     * Uzmanlık rolü
     */
    setRole(role: EngineeringRole): void;
    /**
     * Bilgi tabanı ekleme
     */
    addKnowledge(entry: KnowledgeEntry): void;
    /**
     * Mühendislik isteği alma
     */
    receiveRequest(request: EngineeringRequest): void;
    /**
     * Gereksinim analizi
     */
    analyzeRequirement(request: EngineeringRequest): EngineeringDecision[];
    /**
     * CAD reasoning
     */
    reasonCAD(intent: string): {
        operation: string;
        confidence: number;
    };
    /**
     * Malzeme önerisi
     */
    suggestMaterial(requirement: string): {
        material: string;
        reason: string;
    } | {
        material: string;
        reason?: undefined;
    };
    /**
     * Üretim mantığı
     */
    suggestManufacturing(geometry: any): {
        process: string;
        checked: boolean;
    };
    /**
     * Simülasyon sonucu yorumlama
     */
    interpretSimulation(result: any): {
        safe: boolean;
        recommendation: string;
    };
    /**
     * Karar motoru
     */
    decide(request: EngineeringRequest): EngineeringDecision[];
    /**
     * AI mühendis cevabı
     */
    solve(request: EngineeringRequest): AgentResponse;
    /**
     * İnsan geri bildirimi
     */
    learnFromEngineer(feedback: string): void;
    /**
     * Agent durumu
     */
    status(): {
        role: EngineeringRole;
        knowledge: number;
        memories: number;
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
        role: EngineeringRole;
        status: string;
    };
}
