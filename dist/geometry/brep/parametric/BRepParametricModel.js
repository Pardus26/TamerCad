import { BRepFeatureRebuildPlanner } from "../features/BRepFeatureRebuildPlanner";
import { BRepFeatureRebuildQueue } from "../features/BRepFeatureRebuildQueue";
import { BRepFeatureRebuildMonitor } from "../features/BRepFeatureRebuildMonitor";
import { BRepFeatureRebuildOptimizer } from "../features/BRepFeatureRebuildOptimizer";
import { BRepFeatureRebuildCache } from "../features/BRepFeatureRebuildCache";
export class BRepParametricModel {
    parameters = new Map();
    featureManager;
    dependency;
    planner;
    queue;
    scheduler;
    workerPool;
    monitor;
    optimizer;
    cache;
    revision = 0;
    constructor(featureManager, dependency, scheduler, workerPool) {
        this.featureManager = featureManager;
        this.dependency = dependency;
        this.planner = new BRepFeatureRebuildPlanner(dependency);
        this.queue = new BRepFeatureRebuildQueue();
        this.scheduler = scheduler;
        this.workerPool = workerPool;
        this.monitor = new BRepFeatureRebuildMonitor();
        this.optimizer = new BRepFeatureRebuildOptimizer();
        this.cache = new BRepFeatureRebuildCache();
    }
    addParameter(id, value) {
        this.parameters.set(id, { id, value });
    }
    updateParameter(id, value) {
        const p = this.parameters.get(id);
        if (!p)
            return;
        p.value = value;
        this.revision++;
    }
    getParameter(id) {
        return this.parameters.get(id)?.value;
    }
    rebuild(featureId) {
        const plan = this.planner.createPlan(featureId);
        const optimized = this.optimizer.optimizePlan(plan);
        this.queue.enqueuePlan({
            ...plan,
            orderedFeatures: optimized.optimizedOrder
        });
        this.scheduler.start();
    }
    rebuildAll() {
        for (const feature of this.featureManager.features.values()) {
            this.rebuild(feature.id);
        }
    }
    serialize() {
        return {
            revision: this.revision,
            parameters: Array.from(this.parameters.values())
        };
    }
    info() {
        return {
            engine: "BRepParametricModel",
            revision: this.revision,
            parameterCount: this.parameters.size
        };
    }
}
//# sourceMappingURL=BRepParametricModel.js.map