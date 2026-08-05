import { QueueItem } from "./BRepFeatureRebuildQueue";
import { BRepFeatureExecutor } from "./BRepFeatureExecutor";
export type WorkerStatus = "IDLE" | "BUSY" | "STOPPED";
export interface WorkerResult {
    workerId: string;
    featureId: string;
    success: boolean;
    geometry: any;
    duration: number;
    error?: string;
}
export interface WorkerContext {
    task: QueueItem;
    cancelled: boolean;
}
export declare class BRepFeatureRebuildWorker {
    id: string;
    status: WorkerStatus;
    executor: BRepFeatureExecutor;
    completed: number;
    failed: number;
    totalTime: number;
    cancelled: boolean;
    constructor(id: string, executor: BRepFeatureExecutor);
    /**
     * Task kabul et
     */
    canAccept(): boolean;
    /**
     * Task çalıştır
     */
    execute(task: QueueItem): Promise<WorkerResult>;
    /**
     * Feature execution hook
     */
    processTask(task: QueueItem): Promise<{
        type: string;
        featureId: string;
    }>;
    /**
     * İptal
     */
    cancel(): void;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Ortalama süre
     */
    averageTime(): number;
    /**
     * Worker bilgisi
     */
    info(): {
        id: string;
        status: WorkerStatus;
        completed: number;
        failed: number;
        averageTime: number;
    };
}
