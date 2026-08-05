export var SketchConstraintType;
(function (SketchConstraintType) {
    SketchConstraintType[SketchConstraintType["Coincident"] = 0] = "Coincident";
    SketchConstraintType[SketchConstraintType["Horizontal"] = 1] = "Horizontal";
    SketchConstraintType[SketchConstraintType["Vertical"] = 2] = "Vertical";
    SketchConstraintType[SketchConstraintType["Parallel"] = 3] = "Parallel";
    SketchConstraintType[SketchConstraintType["Perpendicular"] = 4] = "Perpendicular";
    SketchConstraintType[SketchConstraintType["Tangent"] = 5] = "Tangent";
    SketchConstraintType[SketchConstraintType["Equal"] = 6] = "Equal";
    SketchConstraintType[SketchConstraintType["EqualLength"] = 7] = "EqualLength";
    SketchConstraintType[SketchConstraintType["EqualRadius"] = 8] = "EqualRadius";
    SketchConstraintType[SketchConstraintType["Midpoint"] = 9] = "Midpoint";
    SketchConstraintType[SketchConstraintType["Symmetry"] = 10] = "Symmetry";
    SketchConstraintType[SketchConstraintType["Concentric"] = 11] = "Concentric";
    SketchConstraintType[SketchConstraintType["Fix"] = 12] = "Fix";
    SketchConstraintType[SketchConstraintType["Distance"] = 13] = "Distance";
    SketchConstraintType[SketchConstraintType["Radius"] = 14] = "Radius";
    SketchConstraintType[SketchConstraintType["Diameter"] = 15] = "Diameter";
    SketchConstraintType[SketchConstraintType["Angle"] = 16] = "Angle";
})(SketchConstraintType || (SketchConstraintType = {}));
export class SketchConstraint {
    id;
    type;
    entities;
    enabled = true;
    driving = true;
    temporary = false;
    name = "";
    constructor(id, type, entities) {
        this.id = id;
        this.type = type;
        this.entities = entities;
    }
    /**
     * Serialize
     */
    serialize() {
        return {
            id: this.id,
            type: SketchConstraintType[this.type],
            enabled: this.enabled,
            driving: this.driving,
            temporary: this.temporary,
            entities: this.entities.map(e => e.id)
        };
    }
    debugInfo() {
        return {
            id: this.id,
            type: SketchConstraintType[this.type],
            enabled: this.enabled,
            driving: this.driving,
            temporary: this.temporary,
            entityCount: this.entities.length,
            error: this.error()
        };
    }
}
/* ==========================================================
 * Coincident Constraint
 * ========================================================== */
export class CoincidentConstraint extends SketchConstraint {
    constructor(id, pointA, pointB) {
        super(id, SketchConstraintType.Coincident, [pointA, pointB]);
    }
    get p1() {
        return this.entities[0];
    }
    get p2() {
        return this.entities[1];
    }
    solve() {
        const dx = this.p2.position.x -
            this.p1.position.x;
        const dy = this.p2.position.y -
            this.p1.position.y;
        const err = Math.sqrt(dx * dx + dy * dy);
        if (!this.p1.fixed) {
            this.p1.position.x += dx * 0.5;
            this.p1.position.y += dy * 0.5;
        }
        if (!this.p2.fixed) {
            this.p2.position.x -= dx * 0.5;
            this.p2.position.y -= dy * 0.5;
        }
        return err;
    }
    error() {
        return this.p1.position.distanceTo(this.p2.position);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Fix Constraint
 * ========================================================== */
export class FixConstraint extends SketchConstraint {
    constructor(id, entity) {
        super(id, SketchConstraintType.Fix, [entity]);
    }
    solve() {
        this.entities[0].fixed = true;
        return 0;
    }
    error() {
        return 0;
    }
    validate() {
        return this.entities.length === 1;
    }
}
/* ==========================================================
 * Distance Constraint
 * ========================================================== */
export class DistanceConstraint extends SketchConstraint {
    value;
    constructor(id, pointA, pointB, value) {
        super(id, SketchConstraintType.Distance, [pointA, pointB]);
        this.value = value;
    }
    get p1() {
        return this.entities[0];
    }
    get p2() {
        return this.entities[1];
    }
    solve() {
        const dx = this.p2.position.x -
            this.p1.position.x;
        const dy = this.p2.position.y -
            this.p1.position.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        if (length < 1e-9)
            return this.value;
        const diff = (length - this.value) /
            length;
        if (!this.p1.fixed) {
            this.p1.position.x +=
                dx * diff * 0.5;
            this.p1.position.y +=
                dy * diff * 0.5;
        }
        if (!this.p2.fixed) {
            this.p2.position.x -=
                dx * diff * 0.5;
            this.p2.position.y -=
                dy * diff * 0.5;
        }
        return Math.abs(length - this.value);
    }
    error() {
        return Math.abs(this.p1.position.distanceTo(this.p2.position) - this.value);
    }
    validate() {
        return this.value > 0;
    }
}
/* ==========================================================
 * Horizontal Constraint
 * ========================================================== */
export class HorizontalConstraint extends SketchConstraint {
    constructor(id, line) {
        super(id, SketchConstraintType.Horizontal, [line]);
    }
    get line() {
        return this.entities[0];
    }
    solve() {
        const y = (this.line.start.y +
            this.line.end.y) * 0.5;
        if (!this.line.fixed) {
            this.line.start.y = y;
            this.line.end.y = y;
        }
        return Math.abs(this.line.start.y -
            this.line.end.y);
    }
    error() {
        return Math.abs(this.line.start.y -
            this.line.end.y);
    }
    validate() {
        return this.entities.length === 1;
    }
}
/* ==========================================================
 * Vertical Constraint
 * ========================================================== */
export class VerticalConstraint extends SketchConstraint {
    constructor(id, line) {
        super(id, SketchConstraintType.Vertical, [line]);
    }
    get line() {
        return this.entities[0];
    }
    solve() {
        const x = (this.line.start.x +
            this.line.end.x) * 0.5;
        if (!this.line.fixed) {
            this.line.start.x = x;
            this.line.end.x = x;
        }
        return Math.abs(this.line.start.x -
            this.line.end.x);
    }
    error() {
        return Math.abs(this.line.start.x -
            this.line.end.x);
    }
    validate() {
        return this.entities.length === 1;
    }
}
/* ==========================================================
 * Parallel Constraint
 * ========================================================== */
export class ParallelConstraint extends SketchConstraint {
    constructor(id, lineA, lineB) {
        super(id, SketchConstraintType.Parallel, [lineA, lineB]);
    }
    get l1() {
        return this.entities[0];
    }
    get l2() {
        return this.entities[1];
    }
    solve() {
        const dir = this.l1.direction();
        const length = this.l2.length();
        if (!this.l2.fixed) {
            this.l2.end.x =
                this.l2.start.x +
                    dir.x * length;
            this.l2.end.y =
                this.l2.start.y +
                    dir.y * length;
        }
        return this.error();
    }
    error() {
        const d1 = this.l1.direction();
        const d2 = this.l2.direction();
        return Math.abs(d1.x * d2.y -
            d1.y * d2.x);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Perpendicular Constraint
 * ========================================================== */
export class PerpendicularConstraint extends SketchConstraint {
    constructor(id, lineA, lineB) {
        super(id, SketchConstraintType.Perpendicular, [lineA, lineB]);
    }
    get l1() {
        return this.entities[0];
    }
    get l2() {
        return this.entities[1];
    }
    solve() {
        const d = this.l1.direction();
        const perp = new Vector2(-d.y, d.x);
        const len = this.l2.length();
        if (!this.l2.fixed) {
            this.l2.end.x =
                this.l2.start.x +
                    perp.x * len;
            this.l2.end.y =
                this.l2.start.y +
                    perp.y * len;
        }
        return this.error();
    }
    error() {
        const d1 = this.l1.direction();
        const d2 = this.l2.direction();
        return Math.abs(d1.dot(d2));
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Equal Length Constraint
 * ========================================================== */
export class EqualLengthConstraint extends SketchConstraint {
    constructor(id, lineA, lineB) {
        super(id, SketchConstraintType.EqualLength, [lineA, lineB]);
    }
    get l1() {
        return this.entities[0];
    }
    get l2() {
        return this.entities[1];
    }
    solve() {
        const target = this.l1.length();
        const dir = this.l2.direction();
        if (!this.l2.fixed) {
            this.l2.end.x =
                this.l2.start.x +
                    dir.x * target;
            this.l2.end.y =
                this.l2.start.y +
                    dir.y * target;
        }
        return this.error();
    }
    error() {
        return Math.abs(this.l1.length() -
            this.l2.length());
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Midpoint Constraint
 * ========================================================== */
export class MidpointConstraint extends SketchConstraint {
    constructor(id, point, line) {
        super(id, SketchConstraintType.Midpoint, [point, line]);
    }
    get point() {
        return this.entities[0];
    }
    get line() {
        return this.entities[1];
    }
    solve() {
        const mx = (this.line.start.x +
            this.line.end.x) * 0.5;
        const my = (this.line.start.y +
            this.line.end.y) * 0.5;
        if (!this.point.fixed) {
            this.point.position.x = mx;
            this.point.position.y = my;
        }
        return this.error();
    }
    error() {
        const mx = (this.line.start.x +
            this.line.end.x) * 0.5;
        const my = (this.line.start.y +
            this.line.end.y) * 0.5;
        return this.point.position.distanceTo(new Vector2(mx, my));
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Equal Radius Constraint
 * ========================================================== */
export class EqualRadiusConstraint extends SketchConstraint {
    constructor(id, circleA, circleB) {
        super(id, SketchConstraintType.EqualRadius, [circleA, circleB]);
    }
    get c1() {
        return this.entities[0];
    }
    get c2() {
        return this.entities[1];
    }
    solve() {
        const radius = this.c1.radius;
        this.c2.radius = radius;
        return this.error();
    }
    error() {
        return Math.abs(this.c1.radius -
            this.c2.radius);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Concentric Constraint
 * ========================================================== */
export class ConcentricConstraint extends SketchConstraint {
    constructor(id, circleA, circleB) {
        super(id, SketchConstraintType.Concentric, [circleA, circleB]);
    }
    get c1() {
        return this.entities[0];
    }
    get c2() {
        return this.entities[1];
    }
    solve() {
        if (!this.c2.fixed) {
            this.c2.center.x = this.c1.center.x;
            this.c2.center.y = this.c1.center.y;
        }
        return this.error();
    }
    error() {
        return this.c1.center.distanceTo(this.c2.center);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Tangent Constraint
 *
 * Şimdilik Circle-Line için temel çözüm.
 * Daha sonra Arc, Spline ve NURBS desteği eklenecek.
 * ========================================================== */
export class TangentConstraint extends SketchConstraint {
    constructor(id, circle, line) {
        super(id, SketchConstraintType.Tangent, [circle, line]);
    }
    get circle() {
        return this.entities[0];
    }
    get line() {
        return this.entities[1];
    }
    solve() {
        const dir = this.line.direction();
        const normal = new Vector2(-dir.y, dir.x);
        this.circle.center.x =
            this.line.start.x +
                normal.x * this.circle.radius;
        this.circle.center.y =
            this.line.start.y +
                normal.y * this.circle.radius;
        return this.error();
    }
    error() {
        const p = this.circle.center;
        const a = this.line.start;
        const b = this.line.end;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const lengthSq = dx * dx + dy * dy;
        if (lengthSq < 1e-12)
            return Number.MAX_VALUE;
        const t = ((p.x - a.x) * dx +
            (p.y - a.y) * dy) / lengthSq;
        const px = a.x + dx * t;
        const py = a.y + dy * t;
        const dist = Math.sqrt((p.x - px) * (p.x - px) +
            (p.y - py) * (p.y - py));
        return Math.abs(dist - this.circle.radius);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Angle Constraint
 * ========================================================== */
export class AngleConstraint extends SketchConstraint {
    targetAngle;
    constructor(id, lineA, lineB, targetAngle) {
        super(id, SketchConstraintType.Angle, [lineA, lineB]);
        this.targetAngle = targetAngle;
    }
    get l1() {
        return this.entities[0];
    }
    get l2() {
        return this.entities[1];
    }
    solve() {
        if (this.l2.fixed)
            return this.error();
        const baseDir = this.l1.direction();
        const length = this.l2.length();
        const angle = Math.atan2(baseDir.y, baseDir.x) + this.targetAngle;
        this.l2.end.x =
            this.l2.start.x +
                Math.cos(angle) * length;
        this.l2.end.y =
            this.l2.start.y +
                Math.sin(angle) * length;
        return this.error();
    }
    error() {
        const d1 = this.l1.direction();
        const d2 = this.l2.direction();
        const angle = Math.atan2(d2.y, d2.x) -
            Math.atan2(d1.y, d1.x);
        return Math.abs(angle -
            this.targetAngle);
    }
    validate() {
        return this.entities.length === 2;
    }
}
/* ==========================================================
 * Radius Constraint
 * ========================================================== */
export class RadiusConstraint extends SketchConstraint {
    radius;
    constructor(id, circle, radius) {
        super(id, SketchConstraintType.Radius, [circle]);
        this.radius = radius;
    }
    get circle() {
        return this.entities[0];
    }
    solve() {
        this.circle.radius = this.radius;
        return this.error();
    }
    error() {
        return Math.abs(this.circle.radius -
            this.radius);
    }
    validate() {
        return this.entities.length === 1;
    }
}
/* ==========================================================
 * Diameter Constraint
 * ========================================================== */
export class DiameterConstraint extends SketchConstraint {
    diameter;
    constructor(id, circle, diameter) {
        super(id, SketchConstraintType.Diameter, [circle]);
        this.diameter = diameter;
    }
    get circle() {
        return this.entities[0];
    }
    solve() {
        this.circle.radius =
            this.diameter * 0.5;
        return this.error();
    }
    error() {
        return Math.abs(this.circle.radius -
            this.diameter * 0.5);
    }
    validate() {
        return this.entities.length === 1;
    }
}
/* ==========================================================
 * Constraint Factory
 * ========================================================== */
export class SketchConstraintFactory {
    static create(type, id, entities, value) {
        switch (type) {
            case SketchConstraintType.Coincident:
                return new CoincidentConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Horizontal:
                return new HorizontalConstraint(id, entities[0]);
            case SketchConstraintType.Vertical:
                return new VerticalConstraint(id, entities[0]);
            case SketchConstraintType.Parallel:
                return new ParallelConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Perpendicular:
                return new PerpendicularConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.EqualLength:
                return new EqualLengthConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Midpoint:
                return new MidpointConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.EqualRadius:
                return new EqualRadiusConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Concentric:
                return new ConcentricConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Tangent:
                return new TangentConstraint(id, entities[0], entities[1]);
            case SketchConstraintType.Angle:
                return new AngleConstraint(id, entities[0], entities[1], value ?? 0);
            case SketchConstraintType.Radius:
                return new RadiusConstraint(id, entities[0], value ?? 0);
            case SketchConstraintType.Diameter:
                return new DiameterConstraint(id, entities[0], value ?? 0);
            default:
                throw new Error(`Unsupported constraint type: ${type}`);
        }
    }
}
/* ==========================================================
 * Constraint Registry
 * ========================================================== */
export const SketchConstraintRegistry = {
    create: SketchConstraintFactory.create
};
/* ==========================================================
 * Deserialize Helper
 * ========================================================== */
export function deserializeConstraint(data, entities) {
    const refs = [];
    for (const id of data.entities) {
        const entity = entities.find(e => e.id === id);
        if (entity)
            refs.push(entity);
    }
    return SketchConstraintFactory.create(data.type, data.id, refs, data.value);
}
//# sourceMappingURL=SketchConstraint.js.map