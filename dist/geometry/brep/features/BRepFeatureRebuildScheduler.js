export class BRepFeatureRebuildScheduler {
    queue;
    workers;
    activeWorkers;
    running;
    cancelled;
    listeners;
    constructor(queue, options = {
        workers: 4,
        autoStart: false
    }) {
        this.queue =
            queue;
        this.workers =
            options.workers;
        this.activeWorkers =
            0;
        this.running =
            options.autoStart;
        this.cancelled =
            false;
        this.listeners = [];
    }
    /**
     * Event listener
     */
    on(callback) {
        this.listeners.push(callback);
    }
    emit(event) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
    /**
     * Scheduler başlat
     */
    start() {
        if (this.running) {
            return;
        }
        this.running = true;
        this.cancelled = false;
        this.queue.start();
        this.emit({
            type: "START"
        });
        this.process();
    }
    /**
     * Ana scheduler loop
     */
    async process() {
        while (this.running &&
            !this.cancelled) {
            while (this.activeWorkers <
                this.workers &&
                !this.queue.isEmpty()) {
                const task = this.queue.next();
                if (task) {
                    this.runTask(task);
                }
            }
            if (this.queue.isEmpty() &&
                this.activeWorkers === 0) {
                this.finish();
                break;
            }
            await this.wait(10);
        }
    }
    /**
     * Task çalıştır
     */
    async runTask(task) {
        this.activeWorkers++;
        task.status =
            "RUNNING";
        try {
            await this.executeTask(task);
            this.queue.complete(task);
            this.emit({
                type: "COMPLETE",
                featureId: task.featureId
            });
        }
        catch (error) {
            this.queue.fail(task);
            this.emit({
                type: "FAILED",
                featureId: task.featureId,
                data: error
            });
        }
        finally {
            this.activeWorkers--;
            this.emit({
                type: "PROGRESS",
                data: this.queue.progress()
            });
        }
    }
    /**
     * Gerçek execution hook
     */
    async executeTask(task) {
        /*
          Burada:

          BRepFeatureExecutor.execute()

          çağrılır.

        */
        return new Promise(resolve => setTimeout(resolve, 1));
    }
    /**
     * Bekleme
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Tamamlandı
     */
    finish() {
        this.running = false;
        this.emit({
            type: "PROGRESS",
            data: this.queue.progress()
        });
    }
    /**
     * Durdur
     */
    stop() {
        this.running = false;
        this.queue.stop();
    }
    /**
     * İptal
     */
    cancel() {
        this.cancelled = true;
        this.running = false;
        this.emit({
            type: "CANCEL"
        });
    }
    /**
     * State
     */
    state() {
        return {
            running: this.running,
            activeWorkers: this.activeWorkers,
            completed: this.queue.completed.length,
            failed: this.queue.failed.length
        };
    }
    /**
     * Reset
     */
    reset() {
        this.stop();
        this.activeWorkers = 0;
        this.cancelled = false;
        this.listeners = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureRebuildScheduler",
            workers: this.workers,
            active: this.activeWorkers,
            running: this.running
        };
    }
}
//# sourceMappingURL=BRepFeatureRebuildScheduler.js.map