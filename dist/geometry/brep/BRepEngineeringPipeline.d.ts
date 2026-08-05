export type PipelineStage = "INPUT" | "CAD" | "CAE" | "OPTIMIZATION" | "CAM" | "VALIDATION" | "OUTPUT";
export type PipelineTaskStatus = "WAITING" | "RUNNING" | "DONE" | "ERROR";
export interface PipelineTask {
    id: string;
    name: string;
    stage: PipelineStage;
    priority: number;
    status: PipelineTaskStatus;
    output?: any;
}
export interface PipelineConfiguration {
    parallel: boolean;
    autonomous: boolean;
    maxIterations: number;
}
export interface PipelineResult {
    success: boolean;
    iterations: number;
    tasks: PipelineTask[];
    artifact: any;
    confidence: number;
}
export declare class BRepEngineeringPipeline {
    tasks: PipelineTask[];
    config: PipelineConfiguration;
    history: any[];
    running: boolean;
    constructor();
    /**
     * Pipeline oluşturma
     */
    create(objective: string): PipelineTask[];
    /**
     * Task router
     */
    route(task: PipelineTask): "CAD_ENGINE" | "SIMULATION_CLUSTER" | "AI_OPTIMIZER" | "MANUFACTURING_ENGINE" | "VALIDATOR";
    /**
     * CAD çalıştırma
     */
    executeCAD(): {
        geometry: string;
        features: string[];
        success: boolean;
    };
    /**
     * CAE çalıştırma
     */
    executeCAE(): {
        stress: number;
        deformation: number;
        thermal: boolean;
        success: boolean;
    };
    /**
     * AI optimizasyon
     */
    executeOptimization(simulation: any): {
        improved: boolean;
        massReduction: number;
        strengthGain: number;
        basedOn: any;
    };
    /**
     * CAM kontrolü
     */
    executeCAM(): {
        cnc: boolean;
        machiningTime: number;
        manufacturable: boolean;
    };
    /**
     * Validation
     */
    validate(): {
        passed: boolean;
        checks: string[];
    };
    /**
     * Task yürütme
     */
    executeTask(task: PipelineTask): PipelineTask;
    /**
     * Pipeline çalıştırma
     */
    run(iterations?: number): PipelineResult;
    /**
     * Pipeline öğrenmesi
     */
    learn(experience: any): void;
    /**
     * Ayar değiştirme
     */
    configure(config: Partial<PipelineConfiguration>): void;
    /**
     * Durum
     */
    status(): {
        running: boolean;
        tasks: number;
        autonomous: boolean;
        parallel: boolean;
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
        status: string;
    };
}
