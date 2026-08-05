export class BRepFeatureRebuildCache {
    entries;
    maxEntries;
    hits;
    misses;
    constructor(maxEntries = 1000) {
        this.entries = new Map();
        this.maxEntries = maxEntries;
        this.hits = 0;
        this.misses = 0;
    }
    buildSignature(featureId, parameterHash, topologyHash) {
        return `${featureId}:${parameterHash}:${topologyHash}`;
    }
    has(signature) {
        return this.entries.has(signature);
    }
    get(signature) {
        const entry = this.entries.get(signature);
        if (entry) {
            entry.hitCount++;
            entry.timestamp = Date.now();
            this.hits++;
        }
        else {
            this.misses++;
        }
        return entry;
    }
    put(entry) {
        if (this.entries.size >= this.maxEntries) {
            this.evictLRU();
        }
        this.entries.set(entry.signature, entry);
    }
    invalidateFeature(featureId) {
        for (const [key, value] of this.entries) {
            if (value.featureId === featureId) {
                this.entries.delete(key);
            }
        }
    }
    invalidateAll() {
        this.entries.clear();
    }
    evictLRU() {
        let oldestKey;
        let oldest = Number.MAX_SAFE_INTEGER;
        for (const [key, value] of this.entries) {
            if (value.timestamp < oldest) {
                oldest = value.timestamp;
                oldestKey = key;
            }
        }
        if (oldestKey) {
            this.entries.delete(oldestKey);
        }
    }
    statistics() {
        const memoryUsage = Array.from(this.entries.values())
            .reduce((sum, e) => sum + e.memorySize, 0);
        const total = this.hits + this.misses;
        return {
            entries: this.entries.size,
            hits: this.hits,
            misses: this.misses,
            hitRatio: total === 0 ? 0 : this.hits / total,
            memoryUsage
        };
    }
}
//# sourceMappingURL=BRepFeatureRebuildCache.js.map