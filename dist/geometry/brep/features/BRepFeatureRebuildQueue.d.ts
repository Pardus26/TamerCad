import { RebuildPlan } from "./BRepFeatureRebuildPlanner";
export type QueueStatus = "WAITING" | "RUNNING" | "DONE" | "FAILED";
export interface QueueItem {
    id: string;
    featureId: string;
    priority: number;
    status: QueueStatus;
    attempts: number;
    createdAt: number;
}
export interface QueueProgress {
    total: number;
    completed: number;
    failed: number;
    percent: number;
}
export declare class BRepFeatureRebuildQueue {
    queue: QueueItem[];
    completed: QueueItem[];
    failed: QueueItem[];
    running: boolean;
    maxRetries: number;
    constructor();
    /**
     * Plan ekle
     */
    enqueuePlan(plan: RebuildPlan): void;
    /**
     * Queue ekleme
     */
    enqueue(item: QueueItem): void;
    /**
     * Öncelik hesaplama
     */
    calculatePriority(featureId: string, plan: RebuildPlan): number;
    /**
     * Queue sırala
     */
    sort(): void;
    /**
     * Sonraki işlem
     */
    next(): QueueItem | undefined;
    /**
     * Çalıştırma başlat
     */
    start(): void;
    /**
     * Durdur
     */
    stop(): void;
    /**
     * İş tamamlandı
     */
    complete(item: QueueItem): void;
    /**
     * Hata
     */
    fail(item: QueueItem): void;
    /**
     * Queue boş mu
     */
    isEmpty(): boolean;
    /**
     * Progress
     */
    progress(): QueueProgress;
    /**
     * Batch temizle
     */
    clear(): void;
    /**
     * Serialize
     */
    serialize(): {
        waiting: QueueItem[];
        completed: QueueItem[];
        failed: QueueItem[];
    };
    /**
     * Debug
     */
    info(): {
        engine: string;
        waiting: number;
        completed: number;
        failed: number;
    };
}
