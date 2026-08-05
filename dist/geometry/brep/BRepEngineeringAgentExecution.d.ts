export type ExecutionStatus = "QUEUED" | "RUNNING" | "SUCCESS" | "FAILED" | "RETRY";
export interface ExecutionTask {
    id: string;
    name: string;
    agent: string;
    action: string;
    retries: number;
    status: ExecutionStatus;
    result?: any;
}
export interface ExecutionResult {
    task: string;
    success: boolean;
    output: any;
    executionTime: number;
}
export interface RuntimeAgent {
    id: string;
    active: boolean;
    currentTask?: string;
}
export declare class BRepEngineeringAgentExecution {
    tasks: ExecutionTask[];
    agents: RuntimeAgent[];
    results: ExecutionResult[];
    memory: any[];
    running: boolean;
    constructor();
    /**
     * Runtime başlatma
     */
    startRuntime(): {
        started: boolean;
        timestamp: number;
    };
    /**
     * Agent worker ekleme
     */
    registerAgent(agent: RuntimeAgent): void;
    /**
     * Görev ekleme
     */
    addTask(task: ExecutionTask): void;
    /**
     * Planı runtime görevlerine çevirme
     */
    loadPlan(plan: any): ExecutionTask[];
    /**
     * Agent seçimi
     */
    selectWorker(agent: string): RuntimeAgent | undefined;
    /**
     * Tek görev çalıştırma
     */
    executeTask(taskId: string): {
        task: string;
        success: boolean;
        output: {
            message: string;
        };
        executionTime: number;
    } | {
        success: boolean;
        reason: string;
    } | null;
    /**
     * Tüm görevleri çalıştırma
     */
    executeAll(): ({
        task: string;
        success: boolean;
        output: {
            message: string;
        };
        executionTime: number;
    } | {
        success: boolean;
        reason: string;
    } | null)[];
    /**
     * Paralel execution
     */
    executeParallel(): any;
    /**
     * Hata kurtarma
     */
    recoverFailure(taskId: string): {
        retry: boolean;
        count: number;
    } | null;
    /**
     * Sonuç doğrulama
     */
    validateResults(): {
        task: string;
        valid: boolean;
    }[];
    /**
     * İlerleme
     */
    progress(): {
        completed: number;
        total: number;
        percentage: number;
    };
    /**
     * Adaptif execution
     */
    adapt(feedback: any): {
        changed: boolean;
        feedback: any;
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        running: boolean;
        tasks: number;
        results: number;
        agents: number;
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
