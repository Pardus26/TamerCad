export type ClusterNodeState = "IDLE" | "BUSY" | "FAILED";
export interface SimulationNode {
    id: string;
    cpu: number;
    memory: number;
    load: number;
    state: ClusterNodeState;
}
export interface ClusterTask {
    id: string;
    solver: string;
    complexity: number;
    assignedNode?: string;
    completed: boolean;
}
export interface ClusterResult {
    tasks: number;
    nodes: number;
    executionTime: number;
    success: boolean;
}
export interface FaultEvent {
    node: string;
    message: string;
    timestamp: number;
}
export declare class BRepSimulationCluster {
    nodes: SimulationNode[];
    tasks: ClusterTask[];
    faults: FaultEvent[];
    running: boolean;
    startTime: number;
    constructor();
    /**
     * Cluster başlatma
     */
    start(): void;
    /**
     * Node ekleme
     */
    registerNode(node: SimulationNode): void;
    /**
     * Simulation task ekleme
     */
    submitTask(task: ClusterTask): void;
    /**
     * Load balancing
     */
    balanceLoad(): void;
    /**
     * En uygun node seçimi
     */
    findBestNode(): SimulationNode;
    /**
     * Paralel execution
     */
    executeParallel(): void;
    /**
     * Fault detection
     */
    monitorNodes(): void;
    /**
     * Fault recovery
     */
    recoverNode(nodeId: string): void;
    /**
     * Distributed memory
     */
    distributeMemory(): {
        nodes: number;
        shared: boolean;
    };
    /**
     * HPC optimization
     */
    optimizeExecution(): void;
    /**
     * Cluster sonucu
     */
    result(): ClusterResult;
    /**
     * Shutdown
     */
    stop(): void;
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
        tasks: number;
        status: string;
    };
}
