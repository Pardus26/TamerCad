export type SimulationSolver = "FEA" | "CFD" | "THERMAL" | "OPTIMIZATION";
export interface CloudNode {
    id: string;
    cpu: number;
    memory: number;
    active: boolean;
}
export interface SimulationJob {
    id: string;
    solver: SimulationSolver;
    status: "QUEUED" | "RUNNING" | "COMPLETED";
    progress: number;
}
export interface SimulationResult {
    jobId: string;
    success: boolean;
    data: any;
}
export interface CloudSimulationStatus {
    jobs: number;
    nodes: number;
    running: boolean;
}
export declare class BRepCloudSimulation {
    nodes: CloudNode[];
    jobs: SimulationJob[];
    results: SimulationResult[];
    connected: boolean;
    constructor();
    /**
     * Cloud bağlantısı
     */
    connect(): void;
    /**
     * Compute node ekleme
     */
    addNode(node: CloudNode): void;
    /**
     * Simulation job oluşturma
     */
    submitJob(solver: SimulationSolver): string;
    /**
     * Scheduler
     */
    schedule(): void;
    /**
     * Distributed solver çalıştırma
     */
    runSolver(jobId: string): void;
    /**
     * Result toplama
     */
    collectResult(job: SimulationJob): void;
    /**
     * Paralel çözüm
     */
    parallelSolve(): void;
    /**
     * Batch optimization
     */
    runBatch(count: number): void;
    /**
     * Result sync
     */
    synchronizeResults(): {
        synchronized: number;
        timestamp: number;
    };
    /**
     * Remote monitoring
     */
    monitor(): {
        jobs: number;
        completed: number;
    };
    /**
     * Cloud status
     */
    status(): CloudSimulationStatus;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        nodes: number;
        jobs: number;
        status: string;
    };
}
