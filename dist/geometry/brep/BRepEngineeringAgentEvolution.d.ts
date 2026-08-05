export type EvolutionStatus = "INITIAL" | "EVOLVING" | "SELECTING" | "IMPROVED" | "STABLE";
export interface AgentCapability {
    name: string;
    level: number;
    experience: number;
    adaptability: number;
}
export interface AgentGenome {
    agent: string;
    capabilities: AgentCapability[];
    generation: number;
    fitness: number;
}
export interface EvolutionResult {
    agent: string;
    oldFitness: number;
    newFitness: number;
    improvements: string[];
    generation: number;
}
export declare class BRepEngineeringAgentEvolution {
    genomes: AgentGenome[];
    history: EvolutionResult[];
    capabilities: any[];
    generation: number;
    status: EvolutionStatus;
    constructor();
    /**
     * Agent genome oluşturma
     */
    createGenome(agent: string): AgentGenome;
    /**
     * Fitness hesaplama
     */
    evaluateFitness(genome: AgentGenome): number;
    /**
     * Mutation
     */
    mutate(genome: AgentGenome): AgentGenome;
    /**
     * Yeni yetenek kazanımı
     */
    acquireCapability(capability: string): {
        name: string;
        discovered: boolean;
        generation: number;
    };
    /**
     * Selection algoritması
     */
    selectBest(): AgentGenome;
    /**
     * Evrim döngüsü
     */
    evolve(): {
        agent: string;
        oldFitness: number;
        newFitness: number;
        improvements: string[];
        generation: number;
    }[];
    /**
     * Nesil oluşturma
     */
    createNextGeneration(): {
        parent: string;
        generation: number;
        created: boolean;
    };
    /**
     * Bilgi evrimi
     */
    evolveKnowledge(knowledge: any): {
        original: any;
        evolved: string;
        confidence: number;
    };
    /**
     * Strateji evrimi
     */
    evolveStrategy(strategy: any): {
        previous: any;
        improved: boolean;
        optimization: string;
    };
    /**
     * Adaptasyon
     */
    adapt(environment: any): {
        environment: any;
        adaptation: string;
        success: boolean;
    };
    /**
     * Evrim raporu
     */
    report(): {
        generation: number;
        agents: number;
        status: EvolutionStatus;
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
        status: EvolutionStatus;
        generation: number;
    };
}
