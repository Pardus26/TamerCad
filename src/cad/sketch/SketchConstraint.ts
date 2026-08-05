import { SketchEntity } from "./SketchEntity";

export enum SketchConstraintType {

    Coincident,

    Horizontal,

    Vertical,

    Parallel,

    Perpendicular,

    Tangent,

    Equal,

    EqualLength,

    EqualRadius,

    Midpoint,

    Symmetry,

    Concentric,

    Fix,

    Distance,

    Radius,

    Diameter,

    Angle

}

export interface SketchConstraintSolveResult {

    error: number;

    solved: boolean;

}

export abstract class SketchConstraint {

    public readonly id: string;

    public readonly type: SketchConstraintType;

    public readonly entities: SketchEntity[];

    public enabled = true;

    public driving = true;

    public temporary = false;

    public name = "";

    protected constructor(

        id: string,

        type: SketchConstraintType,

        entities: SketchEntity[]

    ) {

        this.id = id;

        this.type = type;

        this.entities = entities;

    }

    /**
     * Solver tarafından çağrılır.
     * Dönen değer residual error'dır.
     */
    abstract solve(): number;

    /**
     * Constraint residual'i.
     */
    abstract error(): number;

    /**
     * Constraint geçerli mi?
     */
    abstract validate(): boolean;

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

            entities:

                this.entities.map(

                    e => e.id

                )

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
import { SketchPoint } from "./SketchEntity";

/* ==========================================================
 * Coincident Constraint
 * ========================================================== */

export class CoincidentConstraint extends SketchConstraint {

    constructor(

        id: string,

        pointA: SketchPoint,

        pointB: SketchPoint

    ) {

        super(

            id,

            SketchConstraintType.Coincident,

            [pointA, pointB]

        );

    }

    private get p1(): SketchPoint {

        return this.entities[0] as SketchPoint;

    }

    private get p2(): SketchPoint {

        return this.entities[1] as SketchPoint;

    }

    solve(): number {

        const dx =
            this.p2.position.x -
            this.p1.position.x;

        const dy =
            this.p2.position.y -
            this.p1.position.y;

        const err =
            Math.sqrt(dx * dx + dy * dy);

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

    error(): number {

        return this.p1.position.distanceTo(

            this.p2.position

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}

/* ==========================================================
 * Fix Constraint
 * ========================================================== */

export class FixConstraint extends SketchConstraint {

    constructor(

        id: string,

        entity: SketchEntity

    ) {

        super(

            id,

            SketchConstraintType.Fix,

            [entity]

        );

    }

    solve(): number {

        this.entities[0].fixed = true;

        return 0;

    }

    error(): number {

        return 0;

    }

    validate(): boolean {

        return this.entities.length === 1;

    }

}

/* ==========================================================
 * Distance Constraint
 * ========================================================== */

export class DistanceConstraint extends SketchConstraint {

    constructor(

        id: string,

        pointA: SketchPoint,

        pointB: SketchPoint,

        public value: number

    ) {

        super(

            id,

            SketchConstraintType.Distance,

            [pointA, pointB]

        );

    }

    private get p1(): SketchPoint {

        return this.entities[0] as SketchPoint;

    }

    private get p2(): SketchPoint {

        return this.entities[1] as SketchPoint;

    }

    solve(): number {

        const dx =
            this.p2.position.x -
            this.p1.position.x;

        const dy =
            this.p2.position.y -
            this.p1.position.y;

        const length =
            Math.sqrt(dx * dx + dy * dy);

        if (length < 1e-9)
            return this.value;

        const diff =
            (length - this.value) /
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

        return Math.abs(

            length - this.value

        );

    }

    error(): number {

        return Math.abs(

            this.p1.position.distanceTo(

                this.p2.position

            ) - this.value

        );

    }

    validate(): boolean {

        return this.value > 0;

    }

}
import { SketchLine } from "./SketchEntity";

/* ==========================================================
 * Horizontal Constraint
 * ========================================================== */

export class HorizontalConstraint extends SketchConstraint {

    constructor(

        id: string,

        line: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Horizontal,

            [line]

        );

    }

    private get line(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    solve(): number {

        const y =

            (

                this.line.start.y +

                this.line.end.y

            ) * 0.5;

        if (!this.line.fixed) {

            this.line.start.y = y;
            this.line.end.y = y;

        }

        return Math.abs(

            this.line.start.y -

            this.line.end.y

        );

    }

    error(): number {

        return Math.abs(

            this.line.start.y -

            this.line.end.y

        );

    }

    validate(): boolean {

        return this.entities.length === 1;

    }

}

/* ==========================================================
 * Vertical Constraint
 * ========================================================== */

export class VerticalConstraint extends SketchConstraint {

    constructor(

        id: string,

        line: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Vertical,

            [line]

        );

    }

    private get line(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    solve(): number {

        const x =

            (

                this.line.start.x +

                this.line.end.x

            ) * 0.5;

        if (!this.line.fixed) {

            this.line.start.x = x;
            this.line.end.x = x;

        }

        return Math.abs(

            this.line.start.x -

            this.line.end.x

        );

    }

    error(): number {

        return Math.abs(

            this.line.start.x -

            this.line.end.x

        );

    }

    validate(): boolean {

        return this.entities.length === 1;

    }

}

/* ==========================================================
 * Parallel Constraint
 * ========================================================== */

export class ParallelConstraint extends SketchConstraint {

    constructor(

        id: string,

        lineA: SketchLine,

        lineB: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Parallel,

            [lineA, lineB]

        );

    }

    private get l1(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    private get l2(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        const dir =

            this.l1.direction();

        const length =

            this.l2.length();

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

    error(): number {

        const d1 = this.l1.direction();
        const d2 = this.l2.direction();

        return Math.abs(

            d1.x * d2.y -

            d1.y * d2.x

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}
/* ==========================================================
 * Perpendicular Constraint
 * ========================================================== */

export class PerpendicularConstraint extends SketchConstraint {

    constructor(

        id: string,

        lineA: SketchLine,

        lineB: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Perpendicular,

            [lineA, lineB]

        );

    }

    private get l1(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    private get l2(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        const d = this.l1.direction();

        const perp = new Vector2(

            -d.y,

             d.x

        );

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

    error(): number {

        const d1 = this.l1.direction();
        const d2 = this.l2.direction();

        return Math.abs(

            d1.dot(d2)

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}

/* ==========================================================
 * Equal Length Constraint
 * ========================================================== */

export class EqualLengthConstraint extends SketchConstraint {

    constructor(

        id: string,

        lineA: SketchLine,

        lineB: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.EqualLength,

            [lineA, lineB]

        );

    }

    private get l1(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    private get l2(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        const target =

            this.l1.length();

        const dir =

            this.l2.direction();

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

    error(): number {

        return Math.abs(

            this.l1.length() -

            this.l2.length()

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}

/* ==========================================================
 * Midpoint Constraint
 * ========================================================== */

export class MidpointConstraint extends SketchConstraint {

    constructor(

        id: string,

        point: SketchPoint,

        line: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Midpoint,

            [point, line]

        );

    }

    private get point(): SketchPoint {

        return this.entities[0] as SketchPoint;

    }

    private get line(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        const mx =

            (

                this.line.start.x +

                this.line.end.x

            ) * 0.5;

        const my =

            (

                this.line.start.y +

                this.line.end.y

            ) * 0.5;

        if (!this.point.fixed) {

            this.point.position.x = mx;
            this.point.position.y = my;

        }

        return this.error();

    }

    error(): number {

        const mx =

            (

                this.line.start.x +

                this.line.end.x

            ) * 0.5;

        const my =

            (

                this.line.start.y +

                this.line.end.y

            ) * 0.5;

        return this.point.position.distanceTo(

            new Vector2(mx, my)

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}
/* ==========================================================
 * Equal Radius Constraint
 * ========================================================== */

export class EqualRadiusConstraint extends SketchConstraint {

    constructor(

        id: string,

        circleA: SketchCircle,

        circleB: SketchCircle

    ) {

        super(

            id,

            SketchConstraintType.EqualRadius,

            [circleA, circleB]

        );

    }

    private get c1(): SketchCircle {

        return this.entities[0] as SketchCircle;

    }

    private get c2(): SketchCircle {

        return this.entities[1] as SketchCircle;

    }

    solve(): number {

        const radius = this.c1.radius;

        this.c2.radius = radius;

        return this.error();

    }

    error(): number {

        return Math.abs(

            this.c1.radius -

            this.c2.radius

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}

/* ==========================================================
 * Concentric Constraint
 * ========================================================== */

export class ConcentricConstraint extends SketchConstraint {

    constructor(

        id: string,

        circleA: SketchCircle,

        circleB: SketchCircle

    ) {

        super(

            id,

            SketchConstraintType.Concentric,

            [circleA, circleB]

        );

    }

    private get c1(): SketchCircle {

        return this.entities[0] as SketchCircle;

    }

    private get c2(): SketchCircle {

        return this.entities[1] as SketchCircle;

    }

    solve(): number {

        if (!this.c2.fixed) {

            this.c2.center.x = this.c1.center.x;
            this.c2.center.y = this.c1.center.y;

        }

        return this.error();

    }

    error(): number {

        return this.c1.center.distanceTo(

            this.c2.center

        );

    }

    validate(): boolean {

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

    constructor(

        id: string,

        circle: SketchCircle,

        line: SketchLine

    ) {

        super(

            id,

            SketchConstraintType.Tangent,

            [circle, line]

        );

    }

    private get circle(): SketchCircle {

        return this.entities[0] as SketchCircle;

    }

    private get line(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        const dir = this.line.direction();

        const normal = new Vector2(

            -dir.y,

             dir.x

        );

        this.circle.center.x =

            this.line.start.x +

            normal.x * this.circle.radius;

        this.circle.center.y =

            this.line.start.y +

            normal.y * this.circle.radius;

        return this.error();

    }

    error(): number {

        const p = this.circle.center;

        const a = this.line.start;

        const b = this.line.end;

        const dx = b.x - a.x;
        const dy = b.y - a.y;

        const lengthSq = dx * dx + dy * dy;

        if (lengthSq < 1e-12)
            return Number.MAX_VALUE;

        const t =

            (

                (p.x - a.x) * dx +

                (p.y - a.y) * dy

            ) / lengthSq;

        const px = a.x + dx * t;
        const py = a.y + dy * t;

        const dist =

            Math.sqrt(

                (p.x - px) * (p.x - px) +

                (p.y - py) * (p.y - py)

            );

        return Math.abs(

            dist - this.circle.radius

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}
/* ==========================================================
 * Angle Constraint
 * ========================================================== */

export class AngleConstraint extends SketchConstraint {

    constructor(

        id: string,

        lineA: SketchLine,

        lineB: SketchLine,

        public targetAngle: number

    ) {

        super(

            id,

            SketchConstraintType.Angle,

            [lineA, lineB]

        );

    }

    private get l1(): SketchLine {

        return this.entities[0] as SketchLine;

    }

    private get l2(): SketchLine {

        return this.entities[1] as SketchLine;

    }

    solve(): number {

        if (this.l2.fixed)
            return this.error();

        const baseDir = this.l1.direction();

        const length = this.l2.length();

        const angle =

            Math.atan2(

                baseDir.y,

                baseDir.x

            ) + this.targetAngle;

        this.l2.end.x =

            this.l2.start.x +

            Math.cos(angle) * length;

        this.l2.end.y =

            this.l2.start.y +

            Math.sin(angle) * length;

        return this.error();

    }

    error(): number {

        const d1 = this.l1.direction();
        const d2 = this.l2.direction();

        const angle =

            Math.atan2(

                d2.y,

                d2.x

            ) -

            Math.atan2(

                d1.y,

                d1.x

            );

        return Math.abs(

            angle -

            this.targetAngle

        );

    }

    validate(): boolean {

        return this.entities.length === 2;

    }

}

/* ==========================================================
 * Radius Constraint
 * ========================================================== */

export class RadiusConstraint extends SketchConstraint {

    constructor(

        id: string,

        circle: SketchCircle,

        public radius: number

    ) {

        super(

            id,

            SketchConstraintType.Radius,

            [circle]

        );

    }

    private get circle(): SketchCircle {

        return this.entities[0] as SketchCircle;

    }

    solve(): number {

        this.circle.radius = this.radius;

        return this.error();

    }

    error(): number {

        return Math.abs(

            this.circle.radius -

            this.radius

        );

    }

    validate(): boolean {

        return this.entities.length === 1;

    }

}

/* ==========================================================
 * Diameter Constraint
 * ========================================================== */

export class DiameterConstraint extends SketchConstraint {

    constructor(

        id: string,

        circle: SketchCircle,

        public diameter: number

    ) {

        super(

            id,

            SketchConstraintType.Diameter,

            [circle]

        );

    }

    private get circle(): SketchCircle {

        return this.entities[0] as SketchCircle;

    }

    solve(): number {

        this.circle.radius =

            this.diameter * 0.5;

        return this.error();

    }

    error(): number {

        return Math.abs(

            this.circle.radius -

            this.diameter * 0.5

        );

    }

    validate(): boolean {

        return this.entities.length === 1;

    }

}
/* ==========================================================
 * Constraint Factory
 * ========================================================== */

export class SketchConstraintFactory {

    static create(

        type: SketchConstraintType,

        id: string,

        entities: SketchEntity[],

        value?: number

    ): SketchConstraint {

        switch (type) {

            case SketchConstraintType.Coincident:

                return new CoincidentConstraint(
                    id,
                    entities[0] as SketchPoint,
                    entities[1] as SketchPoint
                );

            case SketchConstraintType.Horizontal:

                return new HorizontalConstraint(
                    id,
                    entities[0] as SketchLine
                );

            case SketchConstraintType.Vertical:

                return new VerticalConstraint(
                    id,
                    entities[0] as SketchLine
                );

            case SketchConstraintType.Parallel:

                return new ParallelConstraint(
                    id,
                    entities[0] as SketchLine,
                    entities[1] as SketchLine
                );

            case SketchConstraintType.Perpendicular:

                return new PerpendicularConstraint(
                    id,
                    entities[0] as SketchLine,
                    entities[1] as SketchLine
                );

            case SketchConstraintType.EqualLength:

                return new EqualLengthConstraint(
                    id,
                    entities[0] as SketchLine,
                    entities[1] as SketchLine
                );

            case SketchConstraintType.Midpoint:

                return new MidpointConstraint(
                    id,
                    entities[0] as SketchPoint,
                    entities[1] as SketchLine
                );

            case SketchConstraintType.EqualRadius:

                return new EqualRadiusConstraint(
                    id,
                    entities[0] as SketchCircle,
                    entities[1] as SketchCircle
                );

            case SketchConstraintType.Concentric:

                return new ConcentricConstraint(
                    id,
                    entities[0] as SketchCircle,
                    entities[1] as SketchCircle
                );

            case SketchConstraintType.Tangent:

                return new TangentConstraint(
                    id,
                    entities[0] as SketchCircle,
                    entities[1] as SketchLine
                );

            case SketchConstraintType.Angle:

                return new AngleConstraint(
                    id,
                    entities[0] as SketchLine,
                    entities[1] as SketchLine,
                    value ?? 0
                );

            case SketchConstraintType.Radius:

                return new RadiusConstraint(
                    id,
                    entities[0] as SketchCircle,
                    value ?? 0
                );

            case SketchConstraintType.Diameter:

                return new DiameterConstraint(
                    id,
                    entities[0] as SketchCircle,
                    value ?? 0
                );

            default:

                throw new Error(

                    `Unsupported constraint type: ${type}`

                );

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

export function deserializeConstraint(

    data: any,

    entities: SketchEntity[]

): SketchConstraint {

    const refs: SketchEntity[] = [];

    for (const id of data.entities) {

        const entity = entities.find(

            e => e.id === id

        );

        if (entity)

            refs.push(entity);

    }

    return SketchConstraintFactory.create(

        data.type,

        data.id,

        refs,

        data.value

    );

}
