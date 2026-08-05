// src/render/graph/RenderGraphResource.ts
export var RenderGraphResourceType;
(function (RenderGraphResourceType) {
    RenderGraphResourceType["Texture"] = "Texture";
    RenderGraphResourceType["Buffer"] = "Buffer";
    RenderGraphResourceType["Depth"] = "Depth";
    RenderGraphResourceType["RenderTarget"] = "RenderTarget";
    RenderGraphResourceType["Storage"] = "Storage";
})(RenderGraphResourceType || (RenderGraphResourceType = {}));
export class RenderGraphResource {
    name;
    type;
    descriptor;
    producer = null;
    consumers = [];
    constructor(name, type, descriptor = {}) {
        this.name = name;
        this.type = type;
        this.descriptor = descriptor;
    }
    // ==================================================
    // Producer
    // ==================================================
    setProducer(passName) {
        this.producer = passName;
    }
    getProducer() {
        return this.producer;
    }
    // ==================================================
    // Consumers
    // ==================================================
    addConsumer(passName) {
        if (!this.consumers.includes(passName)) {
            this.consumers.push(passName);
        }
    }
    getConsumers() {
        return this.consumers;
    }
    // ==================================================
    // Lifetime helpers
    // ==================================================
    isProduced() {
        return this.producer !== null;
    }
    isConsumed() {
        return this.consumers.length > 0;
    }
    // ==================================================
    // Reset
    // ==================================================
    clearUsage() {
        this.producer = null;
        this.consumers.length = 0;
    }
    // ==================================================
    // Debug
    // ==================================================
    debugInfo() {
        return {
            name: this.name,
            type: this.type,
            descriptor: this.descriptor,
            producer: this.producer,
            consumers: [
                ...this.consumers
            ]
        };
    }
}
//# sourceMappingURL=RenderGraphResource.js.map