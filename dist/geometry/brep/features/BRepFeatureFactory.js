import { BRepFeature } from "./BRepFeature";
import { BRepFeatureValidator } from "./BRepFeatureValidator";
import { BRepFeatureConstraint } from "./BRepFeatureConstraint";
export class BRepFeatureFactory {
    templates;
    validator;
    constraintSystem;
    cache;
    constructor() {
        this.templates = [
            {
                type: "SKETCH",
                defaults: {
                    plane: "XY"
                }
            },
            {
                type: "EXTRUDE",
                defaults: {
                    length: 10
                }
            },
            {
                type: "HOLE",
                defaults: {
                    diameter: 5,
                    depth: 10
                }
            },
            {
                type: "FILLET",
                defaults: {
                    radius: 2
                }
            },
            {
                type: "CHAMFER",
                defaults: {
                    distance: 1
                }
            },
            {
                type: "PATTERN",
                defaults: {
                    count: 4
                }
            }
        ];
        this.validator =
            new BRepFeatureValidator();
        this.constraintSystem =
            new BRepFeatureConstraint();
        this.cache =
            new Map();
    }
    /**
     * Template bul
     */
    getTemplate(type) {
        return this.templates.find(template => template.type === type);
    }
    /**
     * Default parametre
     */
    buildParameters(type, parameters = {}) {
        const template = this.getTemplate(type);
        return {
            ...(template?.defaults || {}),
            ...parameters
        };
    }
    /**
     * Feature instance oluşturma
     */
    create(options) {
        const parameters = this.buildParameters(options.type, options.parameters);
        const feature = new BRepFeature({
            id: crypto.randomUUID(),
            name: options.name ||
                `${options.type}_001`,
            type: options.type,
            parameters
        });
        if (options.dependencies) {
            feature.dependencies =
                options.dependencies;
        }
        const validation = this.validator.validateFeature(feature);
        if (!validation.valid) {
            return {
                success: false,
                errors: validation.issues.map(i => i.message)
            };
        }
        this.cache.set(feature.id, feature);
        return {
            success: true,
            feature,
            errors: []
        };
    }
    /**
     * Shortcut: Hole
     */
    createHole(diameter, depth) {
        return this.create({
            type: "HOLE",
            parameters: {
                diameter,
                depth
            }
        });
    }
    /**
     * Shortcut: Extrude
     */
    createExtrude(length) {
        return this.create({
            type: "EXTRUDE",
            parameters: {
                length
            }
        });
    }
    /**
     * Shortcut: Fillet
     */
    createFillet(radius) {
        return this.create({
            type: "FILLET",
            parameters: {
                radius
            }
        });
    }
    /**
     * Constraint bağlama
     */
    attachConstraint(featureId, constraint) {
        this.constraintSystem.addConstraint({
            ...constraint,
            featureId
        });
    }
    /**
     * Cache'den getir
     */
    get(id) {
        return this.cache.get(id);
    }
    /**
     * Tüm feature listesi
     */
    getAll() {
        return Array.from(this.cache.values());
    }
    /**
     * Factory reset
     */
    reset() {
        this.cache.clear();
        this.constraintSystem.reset();
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            templates: this.templates,
            features: this.getAll().map(f => f.serialize())
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepFeatureFactory",
            templates: this.templates.length,
            cache: this.cache.size
        };
    }
}
//# sourceMappingURL=BRepFeatureFactory.js.map