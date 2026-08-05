// src/render/graph/RenderGraphCompiler.ts
export class RenderGraphCompiler {
    compile(passes, resources) {
        const executionOrder = this.sortPasses(passes);
        const barriers = this.buildBarriers(executionOrder);
        const lifetimes = this.calculateLifetime(executionOrder, resources);
        return {
            executionOrder,
            barriers,
            lifetimes
        };
    }
    // ==================================================
    // Dependency Sorting
    // ==================================================
    sortPasses(passes) {
        const result = [];
        const visited = new Set();
        const visiting = new Set();
        const visit = (pass) => {
            if (visiting.has(pass)) {
                throw new Error("RenderGraph cycle detected: "
                    +
                        pass.name);
            }
            if (visited.has(pass)) {
                return;
            }
            visiting.add(pass);
            for (const dependency of pass.getDependencies()) {
                visit(dependency);
            }
            visiting.delete(pass);
            visited.add(pass);
            result.push(pass);
        };
        for (const pass of passes) {
            visit(pass);
        }
        return result;
    }
    // ==================================================
    // Resource Barrier
    // ==================================================
    buildBarriers(passes) {
        const barriers = [];
        const states = new Map();
        for (const pass of passes) {
            for (const resource of pass.getReads()) {
                const previous = states.get(resource.name);
                if (previous === "Write") {
                    barriers.push({
                        resource: resource.name,
                        before: "Write",
                        after: "Read"
                    });
                }
                states.set(resource.name, "Read");
            }
            for (const resource of pass.getWrites()) {
                const previous = states.get(resource.name);
                if (previous === "Read") {
                    barriers.push({
                        resource: resource.name,
                        before: "Read",
                        after: "Write"
                    });
                }
                states.set(resource.name, "Write");
            }
        }
        return barriers;
    }
    // ==================================================
    // Resource Lifetime
    // ==================================================
    calculateLifetime(passes, resources) {
        const result = [];
        for (const resource of resources) {
            let firstUse = Number.MAX_SAFE_INTEGER;
            let lastUse = -1;
            for (let i = 0; i < passes.length; i++) {
                const pass = passes[i];
                const used = pass.getReads()
                    .includes(resource)
                    ||
                        pass.getWrites()
                            .includes(resource);
                if (used) {
                    firstUse =
                        Math.min(firstUse, i);
                    lastUse =
                        Math.max(lastUse, i);
                }
            }
            if (lastUse >= 0) {
                result.push({
                    resource: resource.name,
                    firstUse,
                    lastUse
                });
            }
        }
        return result;
    }
    // ==================================================
    // Debug
    // ==================================================
    debugInfo(result) {
        return {
            executionOrder: result.executionOrder
                .map(pass => pass.name),
            barriers: result.barriers,
            lifetimes: result.lifetimes
        };
    }
}
//# sourceMappingURL=RenderGraphCompiler.js.map