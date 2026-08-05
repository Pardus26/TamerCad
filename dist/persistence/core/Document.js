import { BRepModel } from "../../topology/brep/BRepModel";
import { FeatureTree } from "../../modeling/feature/FeatureTree";
import { SketchManager } from "../../modeling/sketch/SketchManager";
export class Document {
    metadata;
    brep;
    featureTree;
    sketches;
    units;
    customProperties = new Map();
    constructor(name) {
        this.metadata = {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date(),
            modifiedAt: new Date(),
            version: "1.0.0"
        };
        this.units = {
            length: "mm",
            angle: "deg"
        };
        this.brep =
            new BRepModel();
        this.featureTree =
            new FeatureTree();
        this.sketches =
            new SketchManager();
    }
    rename(name) {
        this.metadata.name = name;
        this.touch();
    }
    touch() {
        this.metadata.modifiedAt =
            new Date();
    }
    setProperty(key, value) {
        this.customProperties.set(key, value);
        this.touch();
    }
    getProperty(key) {
        return this.customProperties.get(key);
    }
    removeProperty(key) {
        const removed = this.customProperties.delete(key);
        if (removed) {
            this.touch();
        }
        return removed;
    }
    getProperties() {
        return Object.fromEntries(this.customProperties);
    }
    clear() {
        this.customProperties.clear();
    }
    toJSON() {
        return {
            metadata: this.metadata,
            units: this.units,
            properties: this.getProperties()
        };
    }
}
//# sourceMappingURL=Document.js.map