export type OrchestratorMode = "ASSISTED" | "AUTONOMOUS" | "FULL_AI";
export type EngineeringSubsystem = "KNOWLEDGE" | "REASONING" | "DECISION" | "COPILOT" | "WORKFLOW" | "PIPELINE" | "SOLVER";
export interface OrchestratorTask {
    id: string;
    subsystem: EngineeringSubsystem;
    action: string;
    status: "WAITING" | "RUNNING" | "DONE";
}
export interface EngineeringMission {
    objective: string;
    constraints: string[];
    autonomous: boolean;
}
export interface OrchestratorReport {
    success: boolean;
    result: any;
    tasks: OrchestratorTask[];
    confidence: number;
}
export declare class BRepEngineeringOrchestrator {
    mode: OrchestratorMode;
    tasks: OrchestratorTask[];
    missions: EngineeringMission[];
    memory: any[];
    active: boolean;
    constructor();
    /**
     * Mod seçimi
     */
    setMode(mode: OrchestratorMode): void;
    /**
     * Sistem görevi ekleme
     */
    createTask(task: OrchestratorTask): void;
    /**
     * Agent koordinasyonu
     */
    coordinateAgents(): {
        engineeringAgent: string;
        copilot: string;
        advisor: string;
    };
    /**
     * Knowledge koordinasyonu
     */
    coordinateKnowledge(): {
        database: string;
        learning: boolean;
    };
    /**
     * Reasoning yönetimi
     */
    executeReasoning(problem: any): {
        analysis: string;
        confidence: number;
    };
    /**
     * Karar yönetimi
     */
    executeDecision(options: any[]): {
        selected: any;
        confidence: number;
    };
    /**
     * Workflow kontrolü
     */
    controlWorkflow(workflow: any): {
        started: boolean;
        workflow: any;
    };
    /**
     * Pipeline yönetimi
     */
    controlPipeline(pipeline: any): {
        executed: boolean;
        pipeline: any;
    };
    /**
     * Solver yönetimi
     */
    manageSolver(solver: string): {
        solver: string;
        status: string;
    };
    /**
     * Otonom mühendislik döngüsü
     */
    runMission(mission: EngineeringMission): OrchestratorReport;
    /**
     * Sürekli iyileştirme
     */
    autonomousLoop(): {
        learning: boolean;
        optimization: boolean;
        adaptation: boolean;
    };
    /**
     * İnsan müdahalesi
     */
    humanOverride(command: string): {
        accepted: boolean;
        command: string;
    };
    /**
     * Durum
     */
    status(): {
        mode: OrchestratorMode;
        tasks: number;
        missions: number;
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
        mode: OrchestratorMode;
        status: string;
    };
}
