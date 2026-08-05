// src/render/graph/RenderGraphExecutor.ts
export class RenderGraphExecutor {
    lastExecution = [];
    executionTime = new Map();
    barrierCount = 0;
    execute(context, compileResult, options = {}) {
        this.reset();
        this.applyBarriers(context, compileResult);
        for (const pass of compileResult.executionOrder) {
            const start = performance.now();
            this.beginPass(context, pass);
            try {
                pass.execute(context, options.scene, options.camera);
            }
            finally {
                this.endPass(context, pass);
            }
            const elapsed = performance.now()
                -
                    start;
            this.executionTime.set(pass.name, elapsed);
            this.lastExecution.push(pass);
        }
    }
    reset() {
        this.lastExecution.length = 0;
        this.executionTime.clear();
        this.barrierCount = 0;
    }
    // =================================================
    // Resource Barrier Handling
    // =================================================
    applyBarriers(context, result) {
        for (const barrier of result.barriers) {
            this.barrierCount++;
            const anyContext = context;
            anyContext.resourceBarrier?.({
                resource: barrier.resource,
                before: barrier.before,
                after: barrier.after
            });
        }
    }
    beginPass(context, pass) {
        const anyContext = context;
        anyContext.pushDebugMarker?.(pass.name);
    }
    endPass(context, pass) {
        const anyContext = context;
        anyContext.popDebugMarker?.();
    }
    getLastExecution() {
        return this.lastExecution;
    }
    getExecutionTime(passName) {
        return (this.executionTime.get(passName)
            ??
                0);
    }
    debugInfo() {
        return {
            executed: this.lastExecution
                .map(pass => pass.name),
            timings: Object.fromEntries(this.executionTime),
            barriers: this.barrierCount
        };
    }
}
//# sourceMappingURL=RenderGraphExecutor.js.map