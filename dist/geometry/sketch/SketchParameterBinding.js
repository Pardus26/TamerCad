export class SketchParameterBinding {
    parameter;
    target;
    property;
    direction;
    enabled = true;
    constructor(options) {
        this.parameter = options.parameter;
        this.target = options.target;
        this.property = options.property;
        this.direction =
            options.direction ?? "bidirectional";
    }
    syncParameterToSketch() {
        if (!this.enabled)
            return;
        this.target[this.property] =
            this.parameter.value;
    }
    syncSketchToParameter() {
        if (!this.enabled)
            return;
        this.parameter.setValue(this.target[this.property]);
        this.parameter.clearDirty();
    }
    synchronize() {
        switch (this.direction) {
            case "parameter-to-sketch":
                this.syncParameterToSketch();
                break;
            case "sketch-to-parameter":
                this.syncSketchToParameter();
                break;
            case "bidirectional":
                if (this.parameter.dirty) {
                    this.syncParameterToSketch();
                }
                else {
                    this.syncSketchToParameter();
                }
                break;
        }
    }
    validate() {
        return this.property in this.target;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    info() {
        return {
            engine: "SketchParameterBinding",
            parameter: this.parameter.id,
            property: this.property,
            direction: this.direction,
            enabled: this.enabled
        };
    }
}
//# sourceMappingURL=SketchParameterBinding.js.map