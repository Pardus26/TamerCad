export var FeatureType;
(function (FeatureType) {
    FeatureType["BASE"] = "base";
    FeatureType["EXTRUDE"] = "extrude";
    FeatureType["REVOLVE"] = "revolve";
    FeatureType["LOFT"] = "loft";
    FeatureType["SWEEP"] = "sweep";
    FeatureType["FILLET"] = "fillet";
    FeatureType["CHAMFER"] = "chamfer";
    FeatureType["BOOLEAN"] = "boolean";
    FeatureType["PATTERN"] = "pattern";
})(FeatureType || (FeatureType = {}));
export var FeatureState;
(function (FeatureState) {
    FeatureState["CREATED"] = "created";
    FeatureState["VALID"] = "valid";
    FeatureState["FAILED"] = "failed";
    FeatureState["OUTDATED"] = "outdated";
})(FeatureState || (FeatureState = {}));
export class BRepFeature {
    id;
    name;
    type;
    state;
    parameters;
    parents;
    children;
    result;
    constructor(id, name, type) {
        this.id =
            id;
        this.name =
            name;
        this.type =
            type;
        this.state =
            FeatureState.CREATED;
        this.parameters =
            [];
        this.parents =
            [];
        this.children =
            [];
        this.result =
            null;
    }
    /**
     * Parametre ekleme
     */
    addParameter(name, value) {
        this.parameters.push({
            name,
            value
        });
    }
    /**
     * Dependency ekleme
     */
    addParent(feature) {
        this.parents.push(feature);
        feature.children.push(this);
    }
    /**
     * Feature çalıştırma
     */
    execute() {
        /*
            Gerçek CAD:


            Input Features

                 ↓

            Parameter Evaluation

                 ↓

            Geometry Operation

                 ↓

            New BRepSolid


        */
        this.state =
            FeatureState.VALID;
        return {
            success: true,
            solid: this.result,
            message: "Feature executed"
        };
    }
    /**
     * Regeneration
     */
    regenerate() {
        this.state =
            FeatureState.OUTDATED;
        return this.execute();
    }
    /**
     * Child update
     */
    updateChildren() {
        for (const child of this.children) {
            child.regenerate();
        }
    }
    /**
     * Feature geçerlilik
     */
    isValid() {
        return (this.state ===
            FeatureState.VALID);
    }
    /**
     * Parameter değiştirme
     */
    setParameter(name, value) {
        const param = this.parameters.find(p => p.name === name);
        if (param) {
            param.value =
                value;
        }
        this.regenerate();
    }
    /**
     * Feature ağacı bilgisi
     */
    tree() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            children: this.children.length
        };
    }
    /**
     * Clone
     */
    clone() {
        const copy = new BRepFeature(this.id, this.name, this.type);
        copy.parameters =
            [
                ...this.parameters
            ];
        return copy;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepFeature",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepFeature.js.map