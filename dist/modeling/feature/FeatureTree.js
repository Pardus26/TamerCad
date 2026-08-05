export class FeatureTree {
    name;
    features = [];
    activeFeature = null;
    constructor(name = "Model") {
        this.name = name;
    }
    addFeature(feature) {
        if (this.getFeature(feature.id)) {
            throw new Error("Feature id already exists");
        }
        const previous = this.getLastFeature();
        if (previous) {
            previous.addChild(feature);
        }
        this.features.push(feature);
        this.activeFeature =
            feature;
    }
    add(feature) {
        this.addFeature(feature);
    }
    removeFeature(id) {
        const feature = this.getFeature(id);
        if (!feature) {
            return false;
        }
        for (const parent of feature.getParents()) {
            parent.removeChild(feature);
        }
        for (const child of feature.getChildren()) {
            child.parents =
                child.parents.filter(p => p !== feature);
        }
        const index = this.features.indexOf(feature);
        if (index !== -1) {
            this.features.splice(index, 1);
        }
        if (this.activeFeature === feature) {
            this.activeFeature =
                this.getLastFeature();
        }
        return true;
    }
    remove(id) {
        return this.removeFeature(id);
    }
    getFeature(id) {
        return this.features.find(feature => feature.id === id);
    }
    find(id) {
        return this.getFeature(id);
    }
    getLastFeature() {
        if (this.features.length === 0) {
            return null;
        }
        return this.features[this.features.length - 1];
    }
    setActiveFeature(id) {
        const feature = this.find(id);
        if (!feature) {
            return false;
        }
        this.activeFeature =
            feature;
        return true;
    }
    getActiveFeature() {
        return this.activeFeature;
    }
    rebuild() {
        let result = null;
        for (const feature of this.features) {
            result =
                feature.evaluate();
        }
        return result;
    }
    getOrdered() {
        return [
            ...this.features
        ];
    }
    rollback(id) {
        const index = this.features.findIndex(feature => feature.id === id);
        if (index < 0) {
            return null;
        }
        return this.setEnd(this.features[index]);
    }
    setEnd(feature) {
        const index = this.features.indexOf(feature);
        if (index < 0) {
            return null;
        }
        for (let i = 0; i < this.features.length; i++) {
            this.features[i]
                .invalidate();
        }
        let result = null;
        for (let i = 0; i <= index; i++) {
            result =
                this.features[i]
                    .evaluate();
        }
        this.activeFeature =
            feature;
        return result;
    }
    traverse(callback) {
        for (const feature of this.features) {
            callback(feature);
        }
    }
    clear() {
        this.features = [];
        this.activeFeature =
            null;
    }
    get count() {
        return this.features.length;
    }
}
//# sourceMappingURL=FeatureTree.js.map