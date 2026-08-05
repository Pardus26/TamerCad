export type PlanningTaskStatus = "CREATED" | "READY" | "RUNNING" | "DONE" | "BLOCKED";
export type TaskPriority = "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
export interface EngineeringPlanningTask {
    id: string;
    name: string;
    agent: string;
    priority: TaskPriority;
    duration: number;
    dependencies: string[];
    status: PlanningTaskStatus;
}
export interface ResourceAllocation {
    resource: string;
    assignedAgent: string;
    utilization: number;
}
export interface EngineeringPlan {
    objective: string;
    tasks: EngineeringPlanningTask[];
    resources: ResourceAllocation[];
    timeline: any[];
    confidence: number;
}
export declare class BRepEngineeringAgentPlanning {
    tasks: EngineeringPlanningTask[];
    resources: ResourceAllocation[];
    plans: EngineeringPlan[];
    memory: any[];
    constructor();
    /**
     * Görev oluşturma
     */
    createTask(task: EngineeringPlanningTask): EngineeringPlanningTask;
    /**
     * Stratejiyi görevlere bölme
     */
    decompose(objective: string): {
        id: string;
        name: string;
        agent: string;
        priority: string;
        duration: number;
        dependencies: string[];
        status: string;
    }[];
    /**
     * Bağımlılık grafiği
     */
    buildDependencyGraph(): {
        node: string;
        dependsOn: string[];
    }[];
    /**
     * Öncelik sıralaması
     */
    prioritize(): EngineeringPlanningTask[];
    /**
     * Kaynak atama
     */
    allocateResource(resource: string, agent: string): {
        resource: string;
        assignedAgent: string;
        utilization: number;
    };
    /**
     * Zaman çizelgesi üretme
     */
    generateTimeline(): {
        task: string;
        start: number;
        end: number;
    }[];
    /**
     * Paralel çalışma planı
     */
    createParallelExecution(): any;
    /**
     * Plan oluşturma
     */
    createPlan(objective: string): EngineeringPlan;
    /**
     * Plan yürütme
     */
    executePlan(): EngineeringPlanningTask[];
    /**
     * İlerleme takibi
     */
    trackProgress(): {
        completed: number;
        total: number;
        progress: number;
    };
    /**
     * Adaptif planlama
     */
    adapt(feedback: any): {
        changed: boolean;
        feedback: any;
    };
    /**
     * Öğrenme
     */
    learn(experience: any): void;
    /**
     * Durum
     */
    status(): {
        tasks: number;
        plans: number;
        resources: number;
    };
    /**
     * Reset
     */
    reset(): void;
    /**
     * Debug
     */
    info(): {
        engine: string;
        status: string;
    };
}
