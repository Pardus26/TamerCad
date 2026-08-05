import { FeatureTree } from "./FeatureTree";
export class FeatureManager {
    tree;
    constructor() {
        this.tree =
            new FeatureTree();
    }
    addFeature(feature) {
        try {
            this.tree.addFeature(feature);
            return {
                success: true
            };
        }
        catch (error) {
            return {
                success: false,
                message: String(error)
            };
        }
    }
    removeFeature(id) {
        const removed = this.tree.removeFeature(id);
        if (!removed) {
            return {
                success: false,
                message: "Feature not found"
            };
        }
        return {
            success: true
        };
    }
    activateFeature(id) {
        return this.tree
            .setActiveFeature(id);
    }
    getActiveFeature() {
        return this.tree
            .getActiveFeature();
    }
    rebuild() {
        this.tree.rebuild();
    }
    update() {
        this.rebuild();
    }
    rollback(featureId) {
        const result = this.tree.rollback(featureId);
        return result;
    }
    getFeatures() {
        return this.tree
            .getOrdered();
    }
    getFeatureCount() {
        return this.tree.count;
    }
    clear() {
        this.tree.clear();
    }
}
//# sourceMappingURL=FeatureManager.js.map