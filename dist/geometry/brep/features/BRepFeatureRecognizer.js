export class BRepFeatureRecognizer {
    entities;
    recognized;
    confidenceThreshold;
    constructor() {
        this.entities = [];
        this.recognized = [];
        this.confidenceThreshold =
            0.8;
    }
    /**
     * Geometri ekleme
     */
    addEntity(entity) {
        this.entities.push(entity);
    }
    /**
     * Yüzey tipi analizi
     */
    classifySurface(entity) {
        if (entity.type) {
            return entity.type;
        }
        return "UNKNOWN";
    }
    /**
     * Silindirik yüzey algılama
     */
    detectCylinder(entity) {
        if (entity.type === "CYLINDER") {
            return {
                type: "HOLE",
                confidence: 0.95,
                parameters: {
                    radius: entity.radius
                },
                entities: [
                    entity.id
                ]
            };
        }
        return null;
    }
    /**
     * Düz yüzey algılama
     */
    detectExtrude(entity) {
        if (entity.type === "PLANE") {
            return {
                type: "EXTRUDE",
                confidence: 0.85,
                parameters: {
                    direction: entity.normal
                },
                entities: [
                    entity.id
                ]
            };
        }
        return null;
    }
    /**
     * Yuvarlatılmış kenar algılama
     */
    detectFillet(entity) {
        if (entity.radius
            &&
                entity.radius > 0) {
            return {
                type: "FILLET",
                confidence: 0.9,
                parameters: {
                    radius: entity.radius
                },
                entities: [
                    entity.id
                ]
            };
        }
        return null;
    }
    /**
     * Chamfer algılama
     */
    detectChamfer(entity) {
        if (entity.angle) {
            return {
                type: "CHAMFER",
                confidence: 0.85,
                parameters: {
                    angle: entity.angle
                },
                entities: [
                    entity.id
                ]
            };
        }
        return null;
    }
    /**
     * Pattern algılama
     */
    detectPattern(entities) {
        if (entities.length > 2) {
            return {
                type: "PATTERN",
                confidence: 0.82,
                parameters: {
                    count: entities.length
                },
                entities: entities.map(e => e.id)
            };
        }
        return null;
    }
    /**
     * Tüm feature analizi
     */
    recognize() {
        this.recognized = [];
        for (const entity of this.entities) {
            const detectors = [
                this.detectCylinder(entity),
                this.detectExtrude(entity),
                this.detectFillet(entity),
                this.detectChamfer(entity)
            ];
            detectors.forEach(feature => {
                if (feature
                    &&
                        feature.confidence >=
                            this.confidenceThreshold) {
                    this.recognized.push(feature);
                }
            });
        }
        const pattern = this.detectPattern(this.entities);
        if (pattern) {
            this.recognized.push(pattern);
        }
        return {
            success: true,
            features: this.recognized
        };
    }
    /**
     * Feature ağacı üretme
     */
    generateFeatureTree() {
        return this.recognized.map((feature, index) => ({
            id: `FEATURE_${index}`,
            type: feature.type,
            parameters: feature.parameters
        }));
    }
    /**
     * AI eğitim datası
     */
    exportTrainingData() {
        return {
            entities: this.entities,
            recognized: this.recognized
        };
    }
    /**
     * Reset
     */
    reset() {
        this.entities = [];
        this.recognized = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureRecognizer",
            entities: this.entities.length,
            features: this.recognized.length
        };
    }
}
//# sourceMappingURL=BRepFeatureRecognizer.js.map