export class RenderViewport {
    camera;
    rectangle = {
        x: 0,
        y: 0,
        width: 800,
        height: 600
    };
    pixelRatio = 1.0;
    enabled = true;
    constructor(camera, width = 800, height = 600) {
        this.camera = camera;
        this.resize(width, height);
    }
    resize(width, height) {
        this.rectangle.width = Math.max(1, width);
        this.rectangle.height = Math.max(1, height);
        this.camera.setViewport(this.rectangle.width *
            this.pixelRatio, this.rectangle.height *
            this.pixelRatio);
    }
    setPosition(x, y) {
        this.rectangle.x = x;
        this.rectangle.y = y;
    }
    setPixelRatio(ratio) {
        this.pixelRatio = Math.max(0.1, ratio);
        this.resize(this.rectangle.width, this.rectangle.height);
    }
    getPixelRatio() {
        return this.pixelRatio;
    }
    getWidth() {
        return this.rectangle.width;
    }
    getHeight() {
        return this.rectangle.height;
    }
    getAspectRatio() {
        if (this.rectangle.height === 0)
            return 1;
        return this.rectangle.width /
            this.rectangle.height;
    }
    getRectangle() {
        return {
            ...this.rectangle
        };
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    isEnabled() {
        return this.enabled;
    }
    apply(nativeContext) {
        if (!this.enabled)
            return;
        if (!nativeContext)
            return;
        const x = this.rectangle.x *
            this.pixelRatio;
        const y = this.rectangle.y *
            this.pixelRatio;
        const width = this.rectangle.width *
            this.pixelRatio;
        const height = this.rectangle.height *
            this.pixelRatio;
        if (nativeContext.viewport) {
            nativeContext.viewport(x, y, width, height);
        }
    }
    screenCenter() {
        return {
            x: this.rectangle.width * 0.5,
            y: this.rectangle.height * 0.5
        };
    }
    contains(x, y) {
        return (x >= this.rectangle.x &&
            y >= this.rectangle.y &&
            x <= this.rectangle.x +
                this.rectangle.width &&
            y <= this.rectangle.y +
                this.rectangle.height);
    }
    saveState() {
        return {
            rectangle: this.getRectangle(),
            pixelRatio: this.pixelRatio,
            enabled: this.enabled
        };
    }
    restoreState(state) {
        this.rectangle = {
            ...state.rectangle
        };
        this.pixelRatio =
            state.pixelRatio ?? 1;
        this.enabled =
            state.enabled ?? true;
        this.resize(this.rectangle.width, this.rectangle.height);
    }
    toJSON() {
        return this.saveState();
    }
    static fromJSON(camera, json) {
        const viewport = new RenderViewport(camera, json.rectangle.width, json.rectangle.height);
        viewport.restoreState(json);
        return viewport;
    }
}
//# sourceMappingURL=Renderviewport.js.map