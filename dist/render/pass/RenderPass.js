export class RenderPass {
    name;
    priority = 0;
    enabled = true;
    clearColor = false;
    clearDepth = false;
    constructor(options = {}) {
        this.name =
            options.name ??
                this.constructor.name;
        this.priority =
            options.priority ?? 0;
        this.enabled =
            options.enabled ?? true;
        this.clearColor =
            options.clearColor ?? false;
        this.clearDepth =
            options.clearDepth ?? false;
    }
    initialize(context) {
        this.onInitialize(context);
    }
    dispose(context) {
        this.onDispose(context);
    }
    render(context, scene, camera) {
        if (!this.enabled)
            return;
        this.begin(context);
        this.execute(context, scene, camera);
        this.end(context);
    }
    reads() {
        return [];
    }
    writes() {
        return [];
    }
    begin(context) {
        if (this.clearColor ||
            this.clearDepth) {
            context.clear({
                color: this.clearColor,
                depth: this.clearDepth
            });
        }
    }
    end(context) { }
    onInitialize(context) { }
    onDispose(context) { }
}
//# sourceMappingURL=RenderPass.js.map