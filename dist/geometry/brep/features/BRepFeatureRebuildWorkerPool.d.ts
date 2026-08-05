import { BRepFeatureRebuildWorker, WorkerResult } from "./BRepFeatureRebuildWorker";
import { BRepFeatureExecutor } from "./BRepFeatureExecutor";
import { QueueItem } from "./BRepFeatureRebuildQueue";
export interface WorkerPoolOptions {
    size: number;
}
export interface PoolStats {
    totalWorkers: number;
    idleWorkers: number;
    busyWorkers: number;
    completed: number;
    failed: number;
}
export declare class BRepFeatureRebuildWorkerPool {
    workers: Map<string, BRepFeatureRebuildWorker>;
    executor: BRepFeatureExecutor;
    queue: QueueItem[];
    running: boolean;
    constructor(executor: BRepFeatureExecutor, options?: WorkerPoolOptions);
    /**
     * Worker oluştur
     */
    createWorkers(count: number): void;
    /**
     * Boş worker bul
     */
    getIdleWorker(): BRepFeatureRebuildWorker | null;
    /**
     * Task ekle
     */
    addTask(task: QueueItem): void;
    /**
     * Task dağıt
     */
    dispatch(): Promise<void>;
    /**
     * Worker çalıştır
     */
    runWorker(worker: BRepFeatureRebuildWorker, task: QueueItem): Promise<void>;
    /**
     * Sonuç yönetimi
     */
    handleResult(result: WorkerResult): void;
    /**
     * Pool başlat
     */
    start(): void;
    /**
     * Durdur
     */
    stop(): void;
    /**
     * Worker sayısı artır
     */
    scaleUp(): void;
    /**
     * Worker azalt
     */
    scaleDown(): void;
    /**
     * İptal
     */
    cancelAll(): void;
    /**
     * Statistik
     */
    stats(): PoolStats;
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        workers: number;
        queue: number;
        running: boolean;
    };
}
