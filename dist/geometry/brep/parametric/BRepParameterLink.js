export class BRepParameterLink {
    parameter;
    target;
    property;
    enabled;
    constructor(options) {
        this.parameter = options.parameter;
        this.target = options.target;
        this.property = options.property;
        this.enabled = true;
    }
    synchronize() {
        if (!this.enabled) {
            return;
        }
        this.write();
    }
    write() {
        if (!this.enabled) {
            return;
        }
        this.target[this.property] =
            this.parameter.value;
    }
    read() {
        if (!this.enabled) {
            return;
        }
        this.parameter.setValue(this.target[this.property]);
    }
    validate() {
        return this.property in this.target;
    }
    detach() {
        this.enabled = false;
    }
    attach() {
        this.enabled = true;
    }
    info() {
        return {
            parameter: this.parameter.id,
            property: this.property,
            enabled: this.enabled
        };
    }
}
//# sourceMappingURL=BRepParameterLink.js.map