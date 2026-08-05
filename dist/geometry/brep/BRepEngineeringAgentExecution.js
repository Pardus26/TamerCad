export class BRepEngineeringAgentExecution {
    tasks;
    agents;
    results;
    memory;
    running;
    constructor() {
        this.tasks = [];
        this.agents = [];
        this.results = [];
        this.memory = [];
        this.running = false;
    }
    /**
     * Runtime başlatma
     */
    startRuntime() {
        this.running = true;
        return {
            started: true,
            timestamp: Date.now()
        };
    }
    /**
     * Agent worker ekleme
     */
    registerAgent(agent) {
        this.agents.push(agent);
    }
    /**
     * Görev ekleme
     */
    addTask(task) {
        this.tasks.push(task);
    }
    /**
     * Planı runtime görevlerine çevirme
     */
    loadPlan(plan) {
        plan.tasks.forEach((task) => {
            this.addTask({
                id: task.id,
                name: task.name,
                agent: task.agent,
                action: task.name,
                retries: 0,
                status: "QUEUED"
            });
        });
        return this.tasks;
    }
    /**
     * Agent seçimi
     */
    selectWorker(agent) {
        return this.agents.find(worker => worker.id === agent &&
            worker.active);
    }
    /**
     * Tek görev çalıştırma
     */
    executeTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task)
            return null;
        task.status =
            "RUNNING";
        const worker = this.selectWorker(task.agent);
        if (!worker) {
            task.status =
                "FAILED";
            return {
                success: false,
                reason: "Agent unavailable"
            };
        }
        worker.currentTask =
            task.id;
        const start = Date.now();
        const result = {
            task: task.id,
            success: true,
            output: {
                message: `${task.action} completed`
            },
            executionTime: Date.now() - start
        };
        task.status =
            "SUCCESS";
        task.result =
            result;
        this.results.push(result);
        return result;
    }
    /**
     * Tüm görevleri çalıştırma
     */
    executeAll() {
        this.startRuntime();
        return this.tasks.map(task => {
            return this.executeTask(task.id);
        });
    }
    /**
     * Paralel execution
     */
    executeParallel() {
        const groups = {};
        this.tasks.forEach(task => {
            if (!groups[task.agent])
                groups[task.agent] = [];
            groups[task.agent].push(task);
        });
        return groups;
    }
    /**
     * Hata kurtarma
     */
    recoverFailure(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task)
            return null;
        task.retries++;
        task.status =
            "RETRY";
        return {
            retry: true,
            count: task.retries
        };
    }
    /**
     * Sonuç doğrulama
     */
    validateResults() {
        return this.results.map(result => ({
            task: result.task,
            valid: result.success
        }));
    }
    /**
     * İlerleme
     */
    progress() {
        const completed = this.tasks.filter(t => t.status === "SUCCESS").length;
        return {
            completed,
            total: this.tasks.length,
            percentage: completed /
                Math.max(this.tasks.length, 1)
        };
    }
    /**
     * Adaptif execution
     */
    adapt(feedback) {
        const update = {
            changed: true,
            feedback
        };
        this.memory.push(update);
        return update;
    }
    /**
     * Öğrenme
     */
    learn(experience) {
        this.memory.push(experience);
    }
    /**
     * Durum
     */
    status() {
        return {
            running: this.running,
            tasks: this.tasks.length,
            results: this.results.length,
            agents: this.agents.length
        };
    }
    /**
     * Reset
     */
    reset() {
        this.tasks = [];
        this.results = [];
        this.memory = [];
        this.running = false;
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepEngineeringAgentExecution",
            status: this.running
                ?
                    "EXECUTING"
                :
                    "IDLE"
        };
    }
}
//# sourceMappingURL=BRepEngineeringAgentExecution.js.map