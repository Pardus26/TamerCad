export var ConstraintType;
(function (ConstraintType) {
    ConstraintType["DISTANCE"] = "distance";
    ConstraintType["LENGTH"] = "length";
    ConstraintType["ANGLE"] = "angle";
    ConstraintType["RADIUS"] = "radius";
    ConstraintType["COINCIDENT"] = "coincident";
    ConstraintType["PARALLEL"] = "parallel";
    ConstraintType["PERPENDICULAR"] = "perpendicular";
    ConstraintType["TANGENT"] = "tangent";
    ConstraintType["CONCENTRIC"] = "concentric";
})(ConstraintType || (ConstraintType = {}));
export var ConstraintStatus;
(function (ConstraintStatus) {
    ConstraintStatus["SOLVED"] = "solved";
    ConstraintStatus["UNSOLVED"] = "unsolved";
    ConstraintStatus["FAILED"] = "failed";
})(ConstraintStatus || (ConstraintStatus = {}));
export class BRepConstraint {
    id;
    type;
    entities;
    value;
    status;
    constructor(id, type, value) {
        this.id =
            id;
        this.type =
            type;
        this.value =
            value;
        this.entities =
            [];
        this.status =
            ConstraintStatus.UNSOLVED;
    }
    /**
     * Entity ekleme
     */
    addEntity(entity) {
        this.entities.push(entity);
    }
    /**
     * Constraint çözme
     */
    solve() {
        switch (this.type) {
            case ConstraintType.DISTANCE:
                return this.solveDistance();
            case ConstraintType.ANGLE:
                return this.solveAngle();
            case ConstraintType.COINCIDENT:
                return this.solveCoincident();
            default:
                this.status =
                    ConstraintStatus.SOLVED;
                return {
                    success: true,
                    status: this.status
                };
        }
    }
    /**
     * Mesafe constraint
     */
    solveDistance() {
        /*
            Distance equation:


            |P2-P1| = d


        */
        this.status =
            ConstraintStatus.SOLVED;
        return {
            success: true,
            status: this.status
        };
    }
    /**
     * Açı constraint
     */
    solveAngle() {
        /*
            Angle:


            cos(theta)=

            A.B / |A||B|


        */
        this.status =
            ConstraintStatus.SOLVED;
        return {
            success: true,
            status: this.status
        };
    }
    /**
     * Coincident constraint
     */
    solveCoincident() {
        /*
            Point merge:


            P1 = P2


        */
        this.status =
            ConstraintStatus.SOLVED;
        return {
            success: true,
            status: this.status
        };
    }
    /**
     * Constraint doğrulama
     */
    validate() {
        return (this.entities.length > 0);
    }
    /**
     * Değer değiştirme
     */
    setValue(value) {
        this.value =
            value;
        this.status =
            ConstraintStatus.UNSOLVED;
    }
    /**
     * Çözülmüş mü?
     */
    isSolved() {
        return (this.status ===
            ConstraintStatus.SOLVED);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepConstraint",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepConstraint.js.map