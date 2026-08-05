import { BRepFeatureRebuildQueue, QueueItem } from "./BRepFeatureRebuildQueue";
export interface SchedulerOptions {
    workers: number;
    autoStart: boolean;
}
export interface SchedulerEvent {
    type: "START" | "PROGRESS" | "COMPLETE" | "FAILED" | "CANCEL";
    featureId?: string;
    data?: any;
}
export interface SchedulerState {
    running: boolean;
    activeWorkers: number;
    completed: number;
    failed: number;
}
export declare class BRepFeatureRebuildScheduler {
    queue: BRepFeatureRebuildQueue;
    workers: number;
    activeWorkers: number;
    running: boolean;
    cancelled: boolean;
    listeners: Array<(event: SchedulerEvent) => void>;
    constructor(queue: BRepFeatureRebuildQueue, options?: SchedulerOptions);
    /**
     * Event listener
     */
    on(callback: (event: SchedulerEvent) => void): void;
    emit(event: SchedulerEvent): void;
    /**
     * Scheduler başlat
     */
    start(): void;
    /**
     * Ana scheduler loop
     */
    process(): Promise<void>;
    /**
     * Task çalıştır
     */
    runTask(task: QueueItem): Promise<void>;
    /**
     * Gerçek execution hook
     */
    executeTask(task: QueueItem): Promise<unknown>;
    /**
     * Bekleme
     */
    wait(ms: number): Promise<unknown>;
    /**
     * Tamamlandı
     */
    finish(): void;
    /**
     * Durdur
     */
    stop(): void;
    /**
     * İptal
     */
    cancel(): void;
    /**
     * State
     */
    state(): SchedulerState;
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
        active: number;
        running: boolean;
    };
}
