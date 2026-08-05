export class BRepFeatureEvaluator {
    cache;
    density;
    tolerance;
    constructor() {
        this.cache =
            new Map();
        this.density =
            7850;
        this.tolerance =
            0.001;
    }
    /**
     * Parametre oku
     */
    resolveParameters(feature) {
        const result = {};
        for (const parameter of feature.parameters) {
            result[parameter.name] =
                parameter.value;
        }
        return result;
    }
    /**
     * Sketch değerlendirme
     */
    evaluateSketch(context) {
        return {
            area: 0,
            volume: 0
        };
    }
    /**
     * Extrude hesaplama
     */
    evaluateExtrude(context) {
        const params = this.resolveParameters(context.feature);
        const baseArea = params.area || 100;
        const length = params.length || 10;
        return {
            area: baseArea,
            volume: baseArea *
                length
        };
    }
    /**
     * Hole hesaplama
     */
    evaluateHole(context) {
        const params = this.resolveParameters(context.feature);
        const radius = (params.diameter || 5)
            /
                2;
        const depth = params.depth || 10;
        return {
            removedVolume: Math.PI *
                radius *
                radius *
                depth
        };
    }
    /**
     * Fillet hesaplama
     */
    evaluateFillet(context) {
        const params = this.resolveParameters(context.feature);
        return {
            radius: params.radius || 1,
            strengthFactor: 1.05
        };
    }
    /**
     * Chamfer hesaplama
     */
    evaluateChamfer(context) {
        const params = this.resolveParameters(context.feature);
        return {
            distance: params.distance || 1
        };
    }
    /**
     * Pattern hesaplama
     */
    evaluatePattern(context) {
        const params = this.resolveParameters(context.feature);
        return {
            count: params.count || 1
        };
    }
    /**
     * Feature evaluator dispatcher
     */
    calculate(context) {
        switch (context.feature.type) {
            case "SKETCH":
                return this.evaluateSketch(context);
            case "EXTRUDE":
                return this.evaluateExtrude(context);
            case "HOLE":
                return this.evaluateHole(context);
            case "FILLET":
                return this.evaluateFillet(context);
            case "CHAMFER":
                return this.evaluateChamfer(context);
            case "PATTERN":
                return this.evaluatePattern(context);
            default:
                return {};
        }
    }
    /**
     * Bounding box hesaplama
     */
    calculateBoundingBox(result) {
        return {
            min: [0, 0, 0],
            max: [
                10,
                10,
                10
            ],
            size: [
                10,
                10,
                10
            ]
        };
    }
    /**
     * Tam değerlendirme
     */
    evaluate(feature, dependencies = []) {
        const context = {
            feature,
            dependencies
        };
        const result = this.calculate(context);
        const evaluation = {
            featureId: feature.id,
            type: feature.type,
            volume: result.volume || 0,
            area: result.area || 0,
            mass: (result.volume || 0)
                *
                    this.density,
            boundingBox: this.calculateBoundingBox(result),
            parameters: this.resolveParameters(feature)
        };
        this.cache.set(feature.id, evaluation);
        return evaluation;
    }
    /**
     * Feature tree evaluation
     */
    evaluateAll(features) {
        return features.map(feature => this.evaluate(feature));
    }
    /**
     * Cache getir
     */
    getCached(id) {
        return this.cache.get(id);
    }
    /**
     * Cache temizle
     */
    invalidate(id) {
        this.cache.delete(id);
    }
    /**
     * Reset
     */
    reset() {
        this.cache.clear();
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureEvaluator",
            cache: this.cache.size,
            density: this.density
        };
    }
}
//# sourceMappingURL=BRepFeatureEvaluator.js.map