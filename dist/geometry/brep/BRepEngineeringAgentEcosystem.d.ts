export type EcosystemDomain = "DESIGN" | "SIMULATION" | "MANUFACTURING" | "OPTIMIZATION" | "RESEARCH";
export type EcosystemState = "INITIALIZING" | "CONNECTING" | "OPERATING" | "ADAPTING" | "EVOLVING";
export interface EcosystemHive {
    id: string;
    domain: EcosystemDomain;
    intelligence: number;
    agents: number;
    active: boolean;
}
export interface EcosystemKnowledge {
    source: string;
    domain: string;
    knowledge: any;
    confidence: number;
}
export interface EcosystemEvolution {
    generation: number;
    improvements: string[];
    intelligence: number;
}
export declare class BRepEngineeringAgentEcosystem {
    hives: EcosystemHive[];
    knowledge: EcosystemKnowledge[];
    evolution: EcosystemEvolution[];
    memory: any[];
    state: EcosystemState;
    generation: number;
    globalIntelligence: number;
    constructor();
    /**
     * Hive ekleme
     */
    addHive(hive: EcosystemHive): EcosystemHive;
    /**
     * Ecosystem oluşturma
     */
    initialize(): {
        initialized: boolean;
        hives: number;
    };
    /**
     * Global bilgi paylaşımı
     */
    exchangeKnowledge(data: EcosystemKnowledge): {
        exchanged: boolean;
        source: string;
    };
    /**
     * Hive koordinasyonu
     */
    coordinateHives(objective: string): {
        objective: string;
        coordinated: string[];
        strategy: string;
    };
    /**
     * Global zeka hesaplama
     */
    calculateGlobalIntelligence(): number;
    /**
     * Kaynak dağıtımı
     */
    allocateResources(resources: any): {
        resources: any;
        allocation: string;
    };
    /**
     * Çapraz disiplin çözümleme
     */
    crossDomainReasoning(problem: string): {
        problem: string;
        domains: EcosystemDomain[];
        solution: string;
    };
    /**
     * Ekosistem adaptasyonu
     */
    adapt(): {
        adapted: boolean;
        hives: number;
    };
    /**
     * Evrim
     */
    evolve(): {
        generation: number;
        improvements: string[];
        intelligence: number;
    };
    /**
     * Tam ekosistem döngüsü
     */
    runEcosystemCycle(objective: string): {
        coordination: {
            objective: string;
            coordinated: string[];
            strategy: string;
        };
        reasoning: {
            problem: string;
            domains: EcosystemDomain[];
            solution: string;
        };
        adaptation: {
            adapted: boolean;
            hives: number;
        };
        evolution: {
            generation: number;
            improvements: string[];
            intelligence: number;
        };
    };
    /**
     * Durum raporu
     */
    report(): {
        state: EcosystemState;
        hives: number;
        knowledge: number;
        generation: number;
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
        state: EcosystemState;
        intelligence: number;
    };
}
