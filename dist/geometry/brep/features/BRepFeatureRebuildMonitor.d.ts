export interface RebuildMetric {
    featureId: string;
    startTime: number;
    endTime: number;
    duration: number;
    success: boolean;
    memory?: number;
    error?: string;
}
export interface MonitorReport {
    totalFeatures: number;
    completed: number;
    failed: number;
    averageTime: number;
    slowestFeature?: string;
    slowestDuration: number;
}
export interface MonitorEvent {
    type: "START" | "COMPLETE" | "FAILED";
    featureId: string;
    data?: any;
}
export declare class BRepFeatureRebuildMonitor {
    metrics: Map<string, RebuildMetric[]>;
    active: Map<string, number>;
    events: MonitorEvent[];
    constructor();
    /**
     * Feature başlat
     */
    startFeature(featureId: string): void;
    /**
     * Feature tamamlandı
     */
    completeFeature(featureId: string, memory?: number): void;
    /**
     * Feature hata
     */
    failFeature(featureId: string, error: string): void;
    /**
     * Metric kaydet
     */
    storeMetric(metric: RebuildMetric): void;
    /**
     * Feature ortalama süresi
     */
    averageFeatureTime(featureId: string): number;
    /**
     * En yavaş feature
     */
    findSlowest(): {
        featureId: string;
        duration: number;
    };
    /**
     * Rapor oluştur
     */
    report(): MonitorReport;
    /**
     * Timeline
     */
    timeline(): MonitorEvent[];
    /**
     * Temizle
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        trackedFeatures: number;
        active: number;
        events: number;
    };
}
