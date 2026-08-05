export class BRepFeature {
    id;
    name;
    type;
    status;
    parameters;
    dependencies;
    parent;
    children;
    createdAt;
    updatedAt;
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = "CREATED";
        this.parameters = [];
        this.dependencies = [];
        this.children = [];
        this.createdAt =
            Date.now();
        this.updatedAt =
            Date.now();
    }
    /**
     * Parametre ekleme
     */
    addParameter(parameter) {
        this.parameters.push(parameter);
        this.touch();
    }
    /**
     * Parametre güncelleme
     */
    updateParameter(name, value) {
        const parameter = this.parameters.find(p => p.name === name);
        if (parameter) {
            parameter.value = value;
            this.touch();
            return true;
        }
        return false;
    }
    /**
     * Bağımlılık ekleme
     */
    addDependency(dependency) {
        this.dependencies.push(dependency);
    }
    /**
     * Alt feature ekleme
     */
    addChild(feature) {
        feature.parent = this;
        this.children.push(feature);
    }
    /**
     * Feature geçerli mi?
     */
    validate() {
        this.status =
            "VALID";
        return true;
    }
    /**
     * Feature bastırma
     */
    suppress() {
        this.status =
            "SUPPRESSED";
    }
    /**
     * Yeniden oluşturma
     */
    rebuildTree() {
        const result = this.rebuild();
        this.children.forEach(child => {
            child.rebuildTree();
        });
        return result;
    }
    /**
     * Değişim zamanı
     */
    touch() {
        this.updatedAt =
            Date.now();
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            status: this.status,
            parameters: this.parameters,
            dependencies: this.dependencies
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            feature: this.name,
            type: this.type,
            status: this.status
        };
    }
}
//# sourceMappingURL=BRepFeature.js.map