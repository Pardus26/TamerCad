export class BRepFeatureOptimizer {
    features;
    history;
    constructor() {
        this.features = [];
        this.history = [];
    }
    /**
     * Feature ekleme
     */
    addFeature(feature) {
        this.features.push(feature);
    }
    /**
     * Feature karmaşıklığı
     */
    analyzeComplexity() {
        let complexity = 0;
        for (const feature of this.features) {
            complexity +=
                feature.parameters.length;
        }
        return {
            features: this.features.length,
            complexity
        };
    }
    /**
     * Parametre optimizasyonu
     */
    optimizeParameter(feature, parameter, value) {
        const current = feature.parameters.find(p => p.name === parameter);
        return {
            featureId: feature.id,
            parameter,
            current: current?.value,
            optimized: value,
            improvement: 0.15
        };
    }
    /**
     * Fillet optimizasyonu
     */
    optimizeFillet(feature) {
        if (feature.type === "FILLET") {
            return this.optimizeParameter(feature, "radius", 1.5);
        }
        return null;
    }
    /**
     * Hole optimizasyonu
     */
    optimizeHole(feature) {
        if (feature.type === "HOLE") {
            return this.optimizeParameter(feature, "diameter", 4);
        }
        return null;
    }
    /**
     * Extrude optimizasyonu
     */
    optimizeExtrude(feature) {
        if (feature.type === "EXTRUDE") {
            return this.optimizeParameter(feature, "length", 8);
        }
        return null;
    }
    /**
     * Feature sırası optimizasyonu
     */
    optimizeOrder() {
        this.features.sort((a, b) => {
            return a.parameters.length -
                b.parameters.length;
        });
        return {
            reordered: true
        };
    }
    /**
     * Hedef bazlı optimizasyon
     */
    optimize(goal) {
        const improvements = [];
        for (const feature of this.features) {
            let result;
            switch (feature.type) {
                case "FILLET":
                    result =
                        this.optimizeFillet(feature);
                    break;
                case "HOLE":
                    result =
                        this.optimizeHole(feature);
                    break;
                case "EXTRUDE":
                    result =
                        this.optimizeExtrude(feature);
                    break;
            }
            if (result) {
                improvements.push(result);
            }
        }
        this.optimizeOrder();
        const output = {
            success: true,
            goal,
            improvements,
            score: improvements.length *
                0.2
        };
        this.history.push(output);
        return output;
    }
    /**
     * Üretim için optimizasyon
     */
    optimizeManufacturing() {
        return {
            changes: [
                "Reduce unnecessary features",
                "Simplify machining operations",
                "Improve tool accessibility"
            ]
        };
    }
    /**
     * AI öğrenme çıktısı
     */
    exportOptimizationData() {
        return {
            history: this.history,
            complexity: this.analyzeComplexity()
        };
    }
    /**
     * Reset
     */
    reset() {
        this.features = [];
        this.history = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureOptimizer",
            features: this.features.length,
            optimizations: this.history.length
        };
    }
}
//# sourceMappingURL=BRepFeatureOptimizer.js.map