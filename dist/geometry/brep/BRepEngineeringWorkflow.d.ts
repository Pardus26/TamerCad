export type WorkflowStage = "REQUIREMENT" | "CONCEPT" | "CAD" | "SIMULATION" | "OPTIMIZATION" | "MANUFACTURING" | "APPROVAL";
export type WorkflowStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
export interface WorkflowTask {
    id: string;
    name: string;
    stage: WorkflowStage;
    status: WorkflowStatus;
    result?: any;
}
export interface EngineeringWorkflowRequest {
    name: string;
    objectives: string[];
    constraints: string[];
}
export interface WorkflowReport {
    completed: boolean;
    stages: number;
    tasks: WorkflowTask[];
    confidence: number;
}
export declare class BRepEngineeringWorkflow {
    tasks: WorkflowTask[];
    currentStage: WorkflowStage;
    history: any[];
    running: boolean;
    constructor();
    /**
     * Workflow başlatma
     */
    initialize(request: EngineeringWorkflowRequest): void;
    /**
     * Task çalıştırma
     */
    executeTask(taskId: string): WorkflowTask | null;
    /**
     * CAD pipeline
     */
    runCADPipeline(): {
        generated: boolean;
        model: string;
    };
    /**
     * CAE pipeline
     */
    runSimulationPipeline(): {
        stress: number;
        deformation: number;
        safe: boolean;
    };
    /**
     * Optimizasyon pipeline
     */
    runOptimization(): {
        massReduction: string;
        strengthIncrease: string;
        optimized: boolean;
    };
    /**
     * Üretim pipeline
     */
    validateManufacturing(): {
        cnc: boolean;
        printable: boolean;
        manufacturable: boolean;
    };
    /**
     * Workflow yürütme
     */
    run(iterations?: number): WorkflowReport;
    /**
     * Workflow durumu
     */
    status(): {
        stage: WorkflowStage;
        running: boolean;
        tasks: number;
    };
    /**
     * İnsan onayı
     */
    approve(): {
        approved: boolean;
        message: string;
    };
    /**
     * Öğrenme
     */
    learn(result: any): void;
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
