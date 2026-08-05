import { FeatureState } from "./BRepFeature";
export class BRepRegenerator {
    tree;
    constructor(tree) {
        this.tree =
            tree;
    }
    /**
     * Ana regeneration işlemi
     */
    regenerate(options) {
        const order = this.resolveDependencies();
        let rebuilt = 0;
        const failed = [];
        const warnings = [];
        for (const feature of order) {
            const result = this.executeFeature(feature, options);
            if (result) {
                rebuilt++;
            }
            else {
                failed.push(feature.id);
                if (options.stopOnError) {
                    break;
                }
            }
        }
        return {
            success: failed.length === 0,
            rebuilt,
            failed,
            warnings
        };
    }
    /**
     * Dependency çözümü
     */
    resolveDependencies() {
        return this.tree
            .dependencyOrder()
            .map(node => node.feature);
    }
    /**
     * Tek feature çalıştırma
     */
    executeFeature(feature, options) {
        try {
            if (options.incremental &&
                feature.isValid()) {
                return true;
            }
            const result = feature.execute();
            if (result.success) {
                feature.state =
                    FeatureState.VALID;
                return true;
            }
        }
        catch (error) {
            feature.state =
                FeatureState.FAILED;
        }
        return false;
    }
    /**
     * Sadece değişen feature'ları güncelleme
     */
    incrementalUpdate(changed) {
        for (const feature of changed) {
            feature.regenerate();
            feature.updateChildren();
        }
    }
    /**
     * History replay
     */
    replayHistory() {
        const timeline = this.tree.timeline();
        for (const feature of timeline) {
            feature.execute();
        }
    }
    /**
     * Baştan rebuild
     */
    rebuildAll() {
        for (const node of this.tree.nodes) {
            node.feature.state =
                FeatureState.OUTDATED;
        }
        return this.regenerate({
            incremental: false,
            stopOnError: true,
            rebuildFrom: 0
        });
    }
    /**
     * Hata sonrası toparlama
     */
    recover(feature) {
        feature.state =
            FeatureState.OUTDATED;
        return feature.execute();
    }
    /**
     * Regeneration durumu
     */
    status() {
        return {
            total: this.tree.count(),
            valid: this.tree.nodes
                .filter(n => n.feature.isValid())
                .length
        };
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepRegenerator",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepRegenerator.js.map