export var SketchEntityType;
(function (SketchEntityType) {
    SketchEntityType["Line"] = "Line";
    SketchEntityType["Circle"] = "Circle";
    SketchEntityType["Arc"] = "Arc";
    SketchEntityType["Ellipse"] = "Ellipse";
    SketchEntityType["Bezier"] = "Bezier";
    SketchEntityType["BSpline"] = "BSpline";
})(SketchEntityType || (SketchEntityType = {}));
export class SketchEntity {
    id;
    type;
    construction = false;
    visible = true;
    constraints = [];
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    addConstraintReference(constraintId) {
        this.constraints.push(constraintId);
    }
    getConstraintReferences() {
        return this.constraints;
    }
    translate(vector) {
        for (const point of this.getPoints()) {
            point.x +=
                vector.x;
            point.y +=
                vector.y;
            point.z +=
                vector.z;
        }
    }
}
//# sourceMappingURL=SketchEntity.js.map