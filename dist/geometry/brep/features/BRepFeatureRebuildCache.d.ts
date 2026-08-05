export interface FeatureCacheEntry {
    featureId: string;
    signature: string;
    geometry: any;
    topologyHash: string;
    timestamp: number;
    hitCount: number;
    memorySize: number;
}
export interface CacheStatistics {
    entries: number;
    hits: number;
    misses: number;
    hitRatio: number;
    memoryUsage: number;
}
export declare class BRepFeatureRebuildCache {
    private entries;
    private maxEntries;
    private hits;
    private misses;
    constructor(maxEntries?: number);
    buildSignature(featureId: string, parameterHash: string, topologyHash: string): string;
    has(signature: string): boolean;
    get(signature: string): FeatureCacheEntry | undefined;
    put(entry: FeatureCacheEntry): void;
    invalidateFeature(featureId: string): void;
    invalidateAll(): void;
    private evictLRU;
    statistics(): CacheStatistics;
}
