export var FeatureType;
(function (FeatureType) {
    FeatureType["Primitive"] = "Primitive";
    FeatureType["Operation"] = "Operation";
    FeatureType["Modification"] = "Modification";
    FeatureType["Construction"] = "Construction";
})(FeatureType || (FeatureType = {}));
export class Feature {
    id;
    name;
    type;
    parameters;
    children = [];
    parents = [];
    result = null;
    state = {
        dirty: true,
        visible: true
    };
    constructor(id, name, type, parameters = []) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.parameters = parameters;
    }
    evaluate() {
        if (this.state.dirty
            ||
                !this.result) {
            const rebuilt = this.rebuild();
            this.result =
                rebuilt;
            this.state.dirty =
                false;
        }
        return this.result;
    }
    getResult() {
        return this.evaluate();
    }
    setParameter(name, value) {
        const parameter = this.parameters.find(p => p.name === name);
        if (parameter) {
            parameter.value =
                value;
        }
        else {
            this.parameters.push({
                name,
                value
            });
        }
        this.invalidate();
    }
    getParameter(name) {
        const parameter = this.parameters.find(p => p.name === name);
        return parameter?.value;
    }
    addChild(feature) {
        if (this.children.includes(feature)) {
            return;
        }
        this.children.push(feature);
        if (!feature.parents.includes(this)) {
            feature.parents.push(this);
        }
    }
    removeChild(feature) {
        const index = this.children.indexOf(feature);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
        const parentIndex = feature.parents.indexOf(this);
        if (parentIndex !== -1) {
            feature.parents.splice(parentIndex, 1);
        }
    }
    invalidate() {
        this.result =
            null;
        this.state.dirty =
            true;
        for (const child of this.children) {
            child.invalidate();
        }
    }
    setVisible(value) {
        this.state.visible =
            value;
    }
    isVisible() {
        return this.state.visible;
    }
    isDirty() {
        return this.state.dirty;
    }
    getParents() {
        return this.parents;
    }
    getChildren() {
        return this.children;
    }
}
//# sourceMappingURL=Feature.js.map