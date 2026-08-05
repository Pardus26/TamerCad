export class BRepFeatureGenerator {
    templates;
    generated;
    constructor() {
        this.templates = [
            {
                type: "EXTRUDE",
                defaultParameters: {
                    length: 10
                }
            },
            {
                type: "HOLE",
                defaultParameters: {
                    diameter: 5,
                    depth: 10
                }
            },
            {
                type: "FILLET",
                defaultParameters: {
                    radius: 2
                }
            },
            {
                type: "CHAMFER",
                defaultParameters: {
                    distance: 1
                }
            },
            {
                type: "PATTERN",
                defaultParameters: {
                    count: 4
                }
            }
        ];
        this.generated = [];
    }
    /**
     * Template bul
     */
    findTemplate(type) {
        return this.templates.find(template => template.type === type);
    }
    /**
     * Parametre oluştur
     */
    buildParameters(type, input) {
        const template = this.findTemplate(type);
        return {
            ...(template?.defaultParameters || {}),
            ...input
        };
    }
    /**
     * Extrude üret
     */
    generateExtrude(parameters) {
        return {
            id: crypto.randomUUID(),
            type: "EXTRUDE",
            parameters,
            dependencies: []
        };
    }
    /**
     * Hole üret
     */
    generateHole(parameters) {
        return {
            id: crypto.randomUUID(),
            type: "HOLE",
            parameters,
            dependencies: []
        };
    }
    /**
     * Fillet üret
     */
    generateFillet(parameters) {
        return {
            id: crypto.randomUUID(),
            type: "FILLET",
            parameters,
            dependencies: []
        };
    }
    /**
     * Chamfer üret
     */
    generateChamfer(parameters) {
        return {
            id: crypto.randomUUID(),
            type: "CHAMFER",
            parameters,
            dependencies: []
        };
    }
    /**
     * Pattern üret
     */
    generatePattern(parameters) {
        return {
            id: crypto.randomUUID(),
            type: "PATTERN",
            parameters,
            dependencies: []
        };
    }
    /**
     * Genel feature üretici
     */
    generate(type, parameters) {
        const finalParameters = this.buildParameters(type, parameters);
        let feature;
        switch (type) {
            case "EXTRUDE":
                feature =
                    this.generateExtrude(finalParameters);
                break;
            case "HOLE":
                feature =
                    this.generateHole(finalParameters);
                break;
            case "FILLET":
                feature =
                    this.generateFillet(finalParameters);
                break;
            case "CHAMFER":
                feature =
                    this.generateChamfer(finalParameters);
                break;
            case "PATTERN":
                feature =
                    this.generatePattern(finalParameters);
                break;
            default:
                feature = {
                    id: crypto.randomUUID(),
                    type,
                    parameters: finalParameters,
                    dependencies: []
                };
        }
        this.generated.push(feature);
        return feature;
    }
    /**
     * Recognizer çıktısını CAD feature'a çevir
     */
    generateFromRecognition(recognition) {
        return this.generate(recognition.type, recognition.parameters);
    }
    /**
     * Feature zinciri oluştur
     */
    generateFeatureChain(recognitions) {
        return recognitions.map(recognition => this.generateFromRecognition(recognition));
    }
    /**
     * Dependency bağlama
     */
    bindDependency(featureId, dependencyId) {
        const feature = this.generated.find(f => f.id === featureId);
        if (feature) {
            feature.dependencies.push(dependencyId);
            return true;
        }
        return false;
    }
    /**
     * AI reconstruction datası
     */
    exportReconstructionData() {
        return {
            generated: this.generated
        };
    }
    /**
     * Reset
     */
    reset() {
        this.generated = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureGenerator",
            templates: this.templates.length,
            generated: this.generated.length
        };
    }
}
//# sourceMappingURL=BRepFeatureGenerator.js.map