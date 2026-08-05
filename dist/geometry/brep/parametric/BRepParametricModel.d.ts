import { BRepFeatureManager } from "../features/BRepFeatureManager";
import { BRepFeatureDependency } from "../features/BRepFeatureDependency";
import { BRepFeatureRebuildPlanner } from "../features/BRepFeatureRebuildPlanner";
import { BRepFeatureRebuildQueue } from "../features/BRepFeatureRebuildQueue";
import { BRepFeatureRebuildScheduler } from "../features/BRepFeatureRebuildScheduler";
import { BRepFeatureRebuildWorkerPool } from "../features/BRepFeatureRebuildWorkerPool";
import { BRepFeatureRebuildMonitor } from "../features/BRepFeatureRebuildMonitor";
import { BRepFeatureRebuildOptimizer } from "../features/BRepFeatureRebuildOptimizer";
import { BRepFeatureRebuildCache } from "../features/BRepFeatureRebuildCache";
export interface ParametricParameter {
    id: string;
    value: any;
}
export declare class BRepParametricModel {
    readonly parameters: Map<string, ParametricParameter>;
    readonly featureManager: BRepFeatureManager;
    readonly dependency: BRepFeatureDependency;
    readonly planner: BRepFeatureRebuildPlanner;
    readonly queue: BRepFeatureRebuildQueue;
    readonly scheduler: BRepFeatureRebuildScheduler;
    readonly workerPool: BRepFeatureRebuildWorkerPool;
    readonly monitor: BRepFeatureRebuildMonitor;
    readonly optimizer: BRepFeatureRebuildOptimizer;
    readonly cache: BRepFeatureRebuildCache;
    revision: number;
    constructor(featureManager: BRepFeatureManager, dependency: BRepFeatureDependency, scheduler: BRepFeatureRebuildScheduler, workerPool: BRepFeatureRebuildWorkerPool);
    addParameter(id: string, value: any): void;
    updateParameter(id: string, value: any): void;
    getParameter(id: string): any;
    rebuild(featureId: string): void;
    rebuildAll(): void;
    serialize(): {
        revision: number;
        parameters: ParametricParameter[];
    };
    info(): {
        engine: string;
        revision: number;
        parameterCount: number;
    };
}
