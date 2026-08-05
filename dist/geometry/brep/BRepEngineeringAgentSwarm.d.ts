export type SwarmAgentState = "IDLE" | "SEARCHING" | "COOPERATING" | "OPTIMIZING" | "CONVERGED";
export type SwarmBehavior = "EXPLORATION" | "EXPLOITATION" | "COOPERATION" | "ADAPTATION";
export interface SwarmAgent {
    id: string;
    specialty: string;
    state: SwarmAgentState;
    position: any;
    fitness: number;
    behavior: SwarmBehavior;
}
export interface SwarmSolution {
    id: string;
    quality: number;
    contributors: string[];
    parameters: any;
}
export interface SwarmNetwork {
    nodes: string[];
    connections: any[];
}
export declare class BRepEngineeringAgentSwarm {
    agents: SwarmAgent[];
    solutions: SwarmSolution[];
    network: SwarmNetwork;
    memory: any[];
    iteration: number;
    state: SwarmAgentState;
    constructor();
    /**
     * Sürü ajanı ekleme
     */
    addAgent(agent: SwarmAgent): SwarmAgent;
    /**
     * Büyük sürü oluşturma
     */
    createSwarm(count: number): SwarmAgent[];
    /**
     * Ajan iletişim ağı
     */
    buildNetwork(): SwarmNetwork;
    /**
     * Keşif davranışı
     */
    explore(): SwarmAgent[];
    /**
     * Çözüm paylaşımı
     */
    shareSolutions(): {
        shared: boolean;
        solutions: number;
        agents: number;
    };
    /**
     * Fitness değerlendirme
     */
    evaluateFitness(): {
        agent: string;
        fitness: number;
    }[];
    /**
     * En iyi ajan seçimi
     */
    selectBestAgent(): SwarmAgent;
    /**
     * Swarm optimizasyonu
     */
    optimize(objective: string): {
        id: string;
        quality: number;
        contributors: string[];
        parameters: {
            objective: string;
        };
    };
    /**
     * İşbirliği davranışı
     */
    cooperate(): {
        cooperation: boolean;
        agents: number;
    };
    /**
     * Emergent intelligence
     */
    detectEmergence(): {
        emergent: boolean;
        intelligence: string;
    };
    /**
     * Adaptasyon
     */
    adapt(): {
        adapted: boolean;
        count: number;
    };
    /**
     * Swarm döngüsü
     */
    runSwarmCycle(objective: string): {
        solution: {
            id: string;
            quality: number;
            contributors: string[];
            parameters: {
                objective: string;
            };
        };
        emergence: {
            emergent: boolean;
            intelligence: string;
        };
    };
    /**
     * Sürü raporu
     */
    report(): {
        agents: number;
        iterations: number;
        solutions: number;
        state: SwarmAgentState;
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
        state: SwarmAgentState;
    };
}
