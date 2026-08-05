export class BRepFeatureRebuildQueue {
    queue;
    completed;
    failed;
    running;
    maxRetries;
    constructor() {
        this.queue = [];
        this.completed = [];
        this.failed = [];
        this.running = false;
        this.maxRetries = 3;
    }
    /**
     * Plan ekle
     */
    enqueuePlan(plan) {
        for (const featureId of plan.orderedFeatures) {
            this.enqueue({
                id: crypto.randomUUID(),
                featureId,
                priority: this.calculatePriority(featureId, plan),
                status: "WAITING",
                attempts: 0,
                createdAt: Date.now()
            });
        }
    }
    /**
     * Queue ekleme
     */
    enqueue(item) {
        const exists = this.queue.some(q => q.featureId === item.featureId);
        if (exists) {
            return;
        }
        this.queue.push(item);
        this.sort();
    }
    /**
     * Öncelik hesaplama
     */
    calculatePriority(featureId, plan) {
        const index = plan.orderedFeatures.indexOf(featureId);
        return index >= 0
            ? 100 - index
            : 0;
    }
    /**
     * Queue sırala
     */
    sort() {
        this.queue.sort((a, b) => b.priority - a.priority);
    }
    /**
     * Sonraki işlem
     */
    next() {
        return this.queue.shift();
    }
    /**
     * Çalıştırma başlat
     */
    start() {
        this.running = true;
    }
    /**
     * Durdur
     */
    stop() {
        this.running = false;
    }
    /**
     * İş tamamlandı
     */
    complete(item) {
        item.status =
            "DONE";
        this.completed.push(item);
    }
    /**
     * Hata
     */
    fail(item) {
        item.attempts++;
        if (item.attempts <
            this.maxRetries) {
            item.status =
                "WAITING";
            this.queue.push(item);
            this.sort();
        }
        else {
            item.status =
                "FAILED";
            this.failed.push(item);
        }
    }
    /**
     * Queue boş mu
     */
    isEmpty() {
        return this.queue.length === 0;
    }
    /**
     * Progress
     */
    progress() {
        const total = this.completed.length +
            this.failed.length +
            this.queue.length;
        const completed = this.completed.length;
        return {
            total,
            completed,
            failed: this.failed.length,
            percent: total === 0
                ?
                    100
                :
                    (completed /
                        total) * 100
        };
    }
    /**
     * Batch temizle
     */
    clear() {
        this.queue = [];
        this.completed = [];
        this.failed = [];
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            waiting: this.queue,
            completed: this.completed,
            failed: this.failed
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureRebuildQueue",
            waiting: this.queue.length,
            completed: this.completed.length,
            failed: this.failed.length
        };
    }
}
//# sourceMappingURL=BRepFeatureRebuildQueue.js.map