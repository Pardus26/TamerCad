export class BRepFeatureTree {
    root;
    features;
    history;
    currentVersion;
    rollbackPoint;
    constructor() {
        this.features = [];
        this.history = [];
        this.currentVersion = 0;
        this.rollbackPoint = 0;
    }
    /**
     * Root feature belirleme
     */
    setRoot(feature) {
        this.root = feature;
        this.addFeature(feature);
    }
    /**
     * Feature ekleme
     */
    addFeature(feature) {
        this.features.push(feature);
        this.history.push({
            version: this.currentVersion++,
            feature: feature.name,
            timestamp: Date.now()
        });
        return feature;
    }
    /**
     * Feature sırası
     */
    getTimeline() {
        return this.features.map((feature, index) => ({
            index,
            name: feature.name,
            type: feature.type,
            status: feature.status
        }));
    }
    /**
     * Feature bulma
     */
    findFeature(id) {
        return this.features.find(feature => feature.id === id);
    }
    /**
     * İsme göre arama
     */
    findByName(name) {
        return this.features.find(feature => feature.name === name);
    }
    /**
     * Dependency çözümleme
     */
    resolveDependencies() {
        return this.features.map(feature => ({
            feature: feature.name,
            dependencies: feature.dependencies
        }));
    }
    /**
     * Ağacı yeniden oluşturma
     */
    rebuild() {
        let rebuilt = 0;
        const failed = [];
        for (const feature of this.features) {
            if (feature.status ===
                "SUPPRESSED") {
                continue;
            }
            try {
                const result = feature.rebuild();
                if (result.success) {
                    feature.validate();
                    rebuilt++;
                }
                else {
                    feature.status =
                        "FAILED";
                    failed.push(feature.name);
                }
            }
            catch (e) {
                feature.status =
                    "FAILED";
                failed.push(feature.name);
            }
        }
        return {
            success: failed.length === 0,
            rebuilt,
            failed
        };
    }
    /**
     * Belirli noktaya geri dön
     */
    rollback(version) {
        this.rollbackPoint =
            version;
        this.features =
            this.features.filter((feature, index) => index <= version);
        return {
            rollback: true,
            version
        };
    }
    /**
     * Son versiyona dön
     */
    rebuildLatest() {
        return this.rebuild();
    }
    /**
     * Feature bastır
     */
    suppressFeature(id) {
        const feature = this.findFeature(id);
        if (feature) {
            feature.suppress();
            return true;
        }
        return false;
    }
    /**
     * Bastırılmış feature aç
     */
    restoreFeature(id) {
        const feature = this.findFeature(id);
        if (feature) {
            feature.status =
                "VALID";
            return true;
        }
        return false;
    }
    /**
     * Son feature
     */
    getLastFeature() {
        return this.features[this.features.length - 1];
    }
    /**
     * Tree snapshot
     */
    snapshot() {
        return {
            version: this.currentVersion,
            features: this.features.map(f => f.serialize())
        };
    }
    /**
     * Feature ağacı export
     */
    serialize() {
        return {
            root: this.root?.id,
            features: this.features.map(feature => feature.serialize()),
            history: this.history
        };
    }
    /**
     * Tree temizleme
     */
    clear() {
        this.features = [];
        this.history = [];
        this.root = undefined;
        this.currentVersion = 0;
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureTree",
            featureCount: this.features.length,
            version: this.currentVersion
        };
    }
}
//# sourceMappingURL=BRepFeatureTree.js.map