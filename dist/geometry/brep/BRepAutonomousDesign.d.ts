export type AgentMode = "ASSISTED" | "AUTONOMOUS" | "FULL_AUTO";
export interface EngineeringGoal {
    description: string;
    targets: string[];
    constraints: string[];
}
export interface DesignAction {
    action: string;
    parameters: any;
    completed: boolean;
}
export interface AgentMemory {
    decisions: string[];
    successfulDesigns: any[];
    failures: any[];
}
export interface AutonomousResult {
    success: boolean;
    iterations: number;
    finalDesign: any;
    confidence: number;
}
export declare class BRepAutonomousDesign {
    mode: AgentMode;
    goals: EngineeringGoal[];
    actions: DesignAction[];
    memory: AgentMemory;
    running: boolean;
    constructor();
    /**
     * Agent modu
     */
    setMode(mode: AgentMode): void;
    /**
     * Mühendislik hedefi ekleme
     */
    addGoal(goal: EngineeringGoal): void;
    /**
     * Goal reasoning
     */
    analyzeGoal(): {
        objectives: string[];
        constraints: string[];
    };
    /**
     * AI plan oluşturma
     */
    createPlan(): DesignAction[];
    /**
     * CAD operasyon çalıştırma
     */
    executeCADAction(action: DesignAction): void;
    /**
     * Simülasyon değerlendirme
     */
    evaluateSimulation(result: any): boolean;
    /**
     * AI karar motoru
     */
    reason(): {
        decision: string;
        confidence: number;
    };
    /**
     * Tasarım üretme
     */
    generateDesign(): {
        type: string;
        generated: boolean;
        parameters: {
            optimized: boolean;
        };
    };
    /**
     * Öğrenme döngüsü
     */
    learn(feedback: any): void;
    /**
     * Tam otonom tasarım
     */
    run(iterations: number): AutonomousResult;
    /**
     * İnsan-AI ortak çalışma
     */
    humanFeedback(feedback: string): void;
    /**
     * Durum
     */
    status(): {
        mode: AgentMode;
        goals: number;
        actions: number;
        learning: boolean;
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
        mode: AgentMode;
        status: string;
    };
}
