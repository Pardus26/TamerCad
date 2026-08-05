export class BRepFeatureRebuildPlanner {
    dependency;
    cache;
    changeQueue;
    constructor(dependency) {
        this.dependency =
            dependency;
        this.cache =
            new Map();
        this.changeQueue = [];
    }
    /**
     * Değişiklik kaydet
     */
    registerChange(change) {
        this.changeQueue.push(change);
        this.cache.clear();
    }
    /**
     * Etkilenen feature bul
     */
    collectAffectedFeatures(featureId) {
        const affected = new Set();
        const traverse = (id) => {
            const children = this.dependency.getChildren(id);
            for (const child of children) {
                if (!affected.has(child)) {
                    affected.add(child);
                    traverse(child);
                }
            }
        };
        traverse(featureId);
        return Array.from(affected);
    }
    /**
     * Parent dahil et
     */
    includeRoot(featureId, affected) {
        return [
            featureId,
            ...affected
        ];
    }
    /**
     * Yeniden oluşturma sırası
     */
    buildOrder(features) {
        const order = [];
        const visited = new Set();
        const visit = (id) => {
            if (visited.has(id)) {
                return;
            }
            visited.add(id);
            const parents = this.dependency.getParents(id);
            for (const parent of parents) {
                if (features.includes(parent)) {
                    visit(parent);
                }
            }
            order.push(id);
        };
        for (const feature of features) {
            visit(feature);
        }
        return order;
    }
    /**
     * Maliyet tahmini
     */
    estimateCost(features) {
        return features.length *
            10;
    }
    /**
     * Plan oluştur
     */
    createPlan(featureId) {
        const cached = this.cache.get(featureId);
        if (cached) {
            return cached;
        }
        const affected = this.collectAffectedFeatures(featureId);
        const rebuildSet = this.includeRoot(featureId, affected);
        const ordered = this.buildOrder(rebuildSet);
        const plan = {
            changedFeature: featureId,
            affectedFeatures: rebuildSet,
            orderedFeatures: ordered,
            estimatedCost: this.estimateCost(ordered)
        };
        this.cache.set(featureId, plan);
        return plan;
    }
    /**
     * Tüm değişiklikler için plan
     */
    createBatchPlan() {
        const all = new Set();
        for (const change of this.changeQueue) {
            all.add(change.featureId);
        }
        const plans = [];
        for (const id of all) {
            plans.push(this.createPlan(id));
        }
        return plans;
    }
    /**
     * Plan temizleme
     */
    clearChanges() {
        this.changeQueue = [];
    }
    /**
     * Cache reset
     */
    reset() {
        this.cache.clear();
        this.changeQueue = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureRebuildPlanner",
            cachedPlans: this.cache.size,
            pendingChanges: this.changeQueue.length
        };
    }
}
//# sourceMappingURL=BRepFeatureRebuildPlanner.js.map