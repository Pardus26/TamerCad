import { Point3 } from "../point/Point3";
export var SketchEntityType;
(function (SketchEntityType) {
    SketchEntityType["POINT"] = "point";
    SketchEntityType["LINE"] = "line";
    SketchEntityType["CIRCLE"] = "circle";
    SketchEntityType["CURVE"] = "curve";
})(SketchEntityType || (SketchEntityType = {}));
export class BRepSketch {
    id;
    name;
    entities;
    constraints;
    origin;
    constructor(id, name) {
        this.id =
            id;
        this.name =
            name;
        this.entities =
            [];
        this.constraints =
            [];
        this.origin =
            new Point3(0, 0, 0);
    }
    /**
     * Entity ekleme
     */
    addEntity(entity) {
        this.entities.push(entity);
    }
    /**
     * Constraint bağlama
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }
    /**
     * Sketch çözümü
     */
    solveConstraints() {
        for (const constraint of this.constraints) {
            constraint.solve();
        }
    }
    /**
     * Closed profile kontrolü
     */
    isClosed() {
        const curves = this.entities.filter(e => e.geometry !== null);
        return (curves.length > 0);
    }
    /**
     * Profil çıkarma
     */
    generateProfile() {
        const curves = [];
        for (const entity of this.entities) {
            if (entity.geometry) {
                curves.push(entity.geometry);
            }
        }
        return {
            success: curves.length > 0,
            profile: {
                closed: this.isClosed(),
                curves
            }
        };
    }
    /**
     * Feature input hazırlama
     */
    toFeatureInput() {
        return {
            sketchId: this.id,
            profiles: this.generateProfile()
        };
    }
    /**
     * Entity bulma
     */
    findEntity(id) {
        const entity = this.entities.find(e => e.id === id);
        return entity ?? null;
    }
    /**
     * Entity silme
     */
    removeEntity(id) {
        this.entities =
            this.entities.filter(e => e.id !== id);
    }
    /**
     * Sketch temizleme
     */
    clear() {
        this.entities = [];
        this.constraints = [];
    }
    /**
     * Sketch bilgisi
     */
    info() {
        return {
            id: this.id,
            name: this.name,
            entities: this.entities.length,
            constraints: this.constraints.length
        };
    }
    /**
     * Clone
     */
    clone() {
        const copy = new BRepSketch(this.id, this.name);
        copy.entities =
            [
                ...this.entities
            ];
        copy.constraints =
            [
                ...this.constraints
            ];
        return copy;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepSketch",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepSketch.js.map