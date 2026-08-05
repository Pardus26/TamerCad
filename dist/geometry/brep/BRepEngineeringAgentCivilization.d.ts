export type CivilizationSociety = "DESIGN_SOCIETY" | "CAE_SOCIETY" | "CAM_SOCIETY" | "RESEARCH_SOCIETY" | "KNOWLEDGE_SOCIETY";
export type CivilizationState = "BIRTH" | "GROWING" | "LEARNING" | "ADVANCED" | "TRANSCENDENT";
export interface EngineeringSociety {
    id: string;
    domain: CivilizationSociety;
    members: number;
    intelligence: number;
    knowledge: number;
}
export interface CivilizationKnowledge {
    era: number;
    source: string;
    discovery: string;
    importance: number;
}
export interface CivilizationLaw {
    rule: string;
    purpose: string;
    active: boolean;
}
export interface CivilizationEvolution {
    era: number;
    intelligence: number;
    achievements: string[];
}
export declare class BRepEngineeringAgentCivilization {
    societies: EngineeringSociety[];
    knowledge: CivilizationKnowledge[];
    laws: CivilizationLaw[];
    evolution: CivilizationEvolution[];
    memory: any[];
    state: CivilizationState;
    era: number;
    metaIntelligence: number;
    constructor();
    /**
     * Toplum oluşturma
     */
    createSociety(society: EngineeringSociety): EngineeringSociety;
    /**
     * Civilization başlangıcı
     */
    initialize(): {
        created: boolean;
        societies: number;
    };
    /**
     * Bilgi kültürü oluşturma
     */
    createKnowledgeCulture(discovery: CivilizationKnowledge): {
        preserved: boolean;
        discovery: string;
    };
    /**
     * Tarihsel hafıza
     */
    recordHistory(event: any): void;
    /**
     * Medeniyet yönetimi
     */
    govern(): CivilizationLaw[];
    /**
     * Meta akıl yürütme
     */
    metaReason(problem: string): {
        problem: string;
        reasoning: string;
        domains: CivilizationSociety[];
    };
    /**
     * Kültürel bilgi aktarımı
     */
    transferKnowledge(): {
        transferred: boolean;
        societies: number;
        knowledge: number;
    };
    /**
     * Global zeka hesaplama
     */
    calculateMetaIntelligence(): number;
    /**
     * Civilization gelişimi
     */
    advance(): {
        era: number;
        intelligence: number;
        achievements: string[];
    };
    /**
     * Transcendence
     */
    transcend(): {
        transcendent: boolean;
        intelligence: number;
        description: string;
    };
    /**
     * Tam medeniyet döngüsü
     */
    runCivilizationCycle(objective: string): {
        reasoning: {
            problem: string;
            reasoning: string;
            domains: CivilizationSociety[];
        };
        knowledge: {
            transferred: boolean;
            societies: number;
            knowledge: number;
        };
        evolution: {
            era: number;
            intelligence: number;
            achievements: string[];
        };
    };
    /**
     * Rapor
     */
    report(): {
        state: CivilizationState;
        era: number;
        societies: number;
        knowledge: number;
        intelligence: number;
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
        state: CivilizationState;
        era: number;
    };
}
