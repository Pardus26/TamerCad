export type HiveCellType = "CAD_CELL" | "CAE_CELL" | "CAM_CELL" | "OPTIMIZATION_CELL" | "KNOWLEDGE_CELL";
export type HiveState = "CREATING" | "ORGANIZING" | "WORKING" | "ADAPTING" | "EVOLVED";
export interface HiveAgent {
    id: string;
    specialty: string;
    experience: number;
    efficiency: number;
}
export interface HiveCell {
    id: string;
    type: HiveCellType;
    agents: HiveAgent[];
    objective: string;
}
export interface HiveDecision {
    decision: string;
    cells: string[];
    confidence: number;
}
export declare class BRepEngineeringAgentHive {
    cells: HiveCell[];
    agents: HiveAgent[];
    decisions: HiveDecision[];
    memory: any[];
    state: HiveState;
    generation: number;
    constructor();
    /**
     * Hive ajanı ekleme
     */
    addAgent(agent: HiveAgent): HiveAgent;
    /**
     * Uzman hücre oluşturma
     */
    createCell(cell: HiveCell): HiveCell;
    /**
     * Hücreye ajan atama
     */
    assignAgentToCell(agentId: string, cellId: string): boolean;
    /**
     * Hive organizasyonu
     */
    organize(): {
        cell: string;
        agents: number;
        objective: string;
    }[];
    /**
     * Merkezi koordinasyon
     */
    coordinate(objective: string): {
        decision: string;
        cells: string[];
        confidence: number;
    };
    /**
     * Hücreler arası iletişim
     */
    communicate(): {
        communication: string;
        channels: number;
    };
    /**
     * Hive optimizasyonu
     */
    optimize(objective: string): {
        objective: string;
        hiveEfficiency: number;
        optimized: boolean;
    };
    /**
     * Kendi kendini organize etme
     */
    selfOrganize(): {
        reorganized: boolean;
        cells: number;
    };
    /**
     * Hive öğrenme
     */
    learn(experience: any): void;
    /**
     * Evrimsel büyüme
     */
    evolve(): {
        generation: number;
        improvement: boolean;
    };
    /**
     * Hive çalışma döngüsü
     */
    runHiveCycle(objective: string): {
        organization: {
            cell: string;
            agents: number;
            objective: string;
        }[];
        communication: {
            communication: string;
            channels: number;
        };
        coordination: {
            decision: string;
            cells: string[];
            confidence: number;
        };
        optimization: {
            objective: string;
            hiveEfficiency: number;
            optimized: boolean;
        };
    };
    /**
     * Rapor
     */
    report(): {
        state: HiveState;
        cells: number;
        agents: number;
        generation: number;
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
        state: HiveState;
        generation: number;
    };
}
