import { Vector2 } from "../../math/vector/Vector2";
/* ============================================================
 * Sketch Entity System
 * ============================================================
 *
 * Yeni nesil parametrik sketch altyapısı.
 *
 * Bu sınıf;
 *
 * - Constraint Solver
 * - Snap Engine
 * - Tool Controller
 * - Selection
 * - Renderer
 *
 * tarafından ortak kullanılacaktır.
 *
 * ============================================================
 */
export var SketchEntityType;
(function (SketchEntityType) {
    SketchEntityType[SketchEntityType["Point"] = 0] = "Point";
    SketchEntityType[SketchEntityType["Line"] = 1] = "Line";
    SketchEntityType[SketchEntityType["Circle"] = 2] = "Circle";
    SketchEntityType[SketchEntityType["Arc"] = 3] = "Arc";
})(SketchEntityType || (SketchEntityType = {}));
/* ============================================================
 * Entity Flags
 * ============================================================
 */
export var SketchEntityFlags;
(function (SketchEntityFlags) {
    SketchEntityFlags[SketchEntityFlags["None"] = 0] = "None";
    SketchEntityFlags[SketchEntityFlags["Selected"] = 1] = "Selected";
    SketchEntityFlags[SketchEntityFlags["Hidden"] = 2] = "Hidden";
    SketchEntityFlags[SketchEntityFlags["Fixed"] = 4] = "Fixed";
    SketchEntityFlags[SketchEntityFlags["Construction"] = 8] = "Construction";
    SketchEntityFlags[SketchEntityFlags["Dirty"] = 16] = "Dirty";
})(SketchEntityFlags || (SketchEntityFlags = {}));
/* ============================================================
 * Base Entity
 * ============================================================
 */
export class SketchEntity {
    id;
    type;
    flags = SketchEntityFlags.None;
    version = 1;
    boundingBoxDirty = true;
    cachedBoundingBox;
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    /* =======================================================
     * Flags
     * =======================================================
     */
    get selected() {
        return (this.flags &
            SketchEntityFlags.Selected) !== 0;
    }
    set selected(value) {
        if (value) {
            this.flags |=
                SketchEntityFlags.Selected;
        }
        else {
            this.flags &=
                ~SketchEntityFlags.Selected;
        }
    }
    get fixed() {
        return (this.flags &
            SketchEntityFlags.Fixed) !== 0;
    }
    set fixed(value) {
        if (value) {
            this.flags |=
                SketchEntityFlags.Fixed;
        }
        else {
            this.flags &=
                ~SketchEntityFlags.Fixed;
        }
    }
    get construction() {
        return (this.flags &
            SketchEntityFlags.Construction) !== 0;
    }
    set construction(value) {
        if (value) {
            this.flags |=
                SketchEntityFlags.Construction;
        }
        else {
            this.flags &=
                ~SketchEntityFlags.Construction;
        }
    }
    get visible() {
        return (this.flags &
            SketchEntityFlags.Hidden) === 0;
    }
    set visible(value) {
        if (value) {
            this.flags &=
                ~SketchEntityFlags.Hidden;
        }
        else {
            this.flags |=
                SketchEntityFlags.Hidden;
        }
    }
    get dirty() {
        return (this.flags &
            SketchEntityFlags.Dirty) !== 0;
    }
    setDirty() {
        this.flags |=
            SketchEntityFlags.Dirty;
        this.boundingBoxDirty = true;
    }
    clearDirty() {
        this.flags &=
            ~SketchEntityFlags.Dirty;
    }
    /* =======================================================
     * Bounding Box
     * =======================================================
     */
    getBoundingBox() {
        if (!this.boundingBoxDirty &&
            this.cachedBoundingBox) {
            return this.cachedBoundingBox;
        }
        const points = this.getPoints();
        if (points.length === 0) {
            this.cachedBoundingBox = {
                min: new Vector2(0, 0),
                max: new Vector2(0, 0)
            };
            this.boundingBoxDirty = false;
            return this.cachedBoundingBox;
        }
        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        for (const p of points) {
            if (p.x < minX)
                minX = p.x;
            if (p.y < minY)
                minY = p.y;
            if (p.x > maxX)
                maxX = p.x;
            if (p.y > maxY)
                maxY = p.y;
        }
        this.cachedBoundingBox = {
            min: new Vector2(minX, minY),
            max: new Vector2(maxX, maxY)
        };
        this.boundingBoxDirty = false;
        return this.cachedBoundingBox;
    }
    /* =======================================================
     * Closest Point
     * =======================================================
     */
    closestPoint(point) {
        let best = this.getPoints()[0].clone();
        let bestDistance = Number.MAX_VALUE;
        for (const p of this.getPoints()) {
            const d = p.distanceTo(point);
            if (d < bestDistance) {
                bestDistance = d;
                best = p.clone();
            }
        }
        return best;
    }
    /* =======================================================
     * Distance
     * =======================================================
     */
    distanceTo(point) {
        return this.closestPoint(point)
            .distanceTo(point);
    }
    /* =======================================================
     * Projection
     * =======================================================
     */
    projectPoint(point) {
        return this.closestPoint(point);
    }
    /* =======================================================
     * Hit Test
     * =======================================================
     */
    hitTest(point, tolerance = 8) {
        return (this.distanceTo(point) <= tolerance);
    }
    /* =======================================================
     * Handle Queries
     * =======================================================
     */
    findNearestHandle(point, tolerance = 10) {
        let result = null;
        let best = Number.MAX_VALUE;
        for (const h of this.getHandles()) {
            const d = h.position.distanceTo(point);
            if (d < tolerance &&
                d < best) {
                best = d;
                result = h;
            }
        }
        return result;
    }
    findNearestAnchor(point, tolerance = 10) {
        let result = null;
        let best = Number.MAX_VALUE;
        for (const a of this.getAnchorPoints()) {
            const d = a.position.distanceTo(point);
            if (d < tolerance &&
                d < best) {
                best = d;
                result = a;
            }
        }
        return result;
    }
    /* =======================================================
     * Selection Helpers
     * =======================================================
     */
    select() {
        this.selected = true;
    }
    deselect() {
        this.selected = false;
    }
    toggleSelection() {
        this.selected = !this.selected;
    }
    /* =======================================================
     * Visibility
     * =======================================================
     */
    hide() {
        this.visible = false;
    }
    show() {
        this.visible = true;
    }
    /* =======================================================
     * Fixed State
     * =======================================================
     */
    lock() {
        this.fixed = true;
    }
    unlock() {
        this.fixed = false;
    }
    /* =======================================================
     * Serialization
     * =======================================================
     */
    serialize() {
        return {
            id: this.id,
            version: this.version,
            type: this.type,
            flags: this.flags
        };
    }
    /* =======================================================
     * Restore Common State
     * =======================================================
     */
    restoreBaseState(data) {
        this.flags = data.flags;
        this.version = data.version;
        this.boundingBoxDirty = true;
        this.cachedBoundingBox = undefined;
    }
    /* =======================================================
     * Versioning
     * =======================================================
     */
    touch() {
        this.version++;
        this.setDirty();
    }
    getVersion() {
        return this.version;
    }
    /* =======================================================
     * Common Transform Helpers
     * =======================================================
     */
    translatePoint(point, delta) {
        point.add(delta);
    }
    rotatePoint(point, center, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        point.x =
            center.x +
                dx * cos -
                dy * sin;
        point.y =
            center.y +
                dx * sin +
                dy * cos;
    }
    scalePoint(point, center, factor) {
        point.x =
            center.x +
                (point.x - center.x) * factor;
        point.y =
            center.y +
                (point.y - center.y) * factor;
    }
    /* =======================================================
     * Utility
     * =======================================================
     */
    canModify() {
        return !this.fixed;
    }
    invalidateGeometry() {
        this.boundingBoxDirty = true;
        this.cachedBoundingBox = undefined;
        this.touch();
    }
    /* =======================================================
     * Equality
     * =======================================================
     */
    equals(other) {
        return this.id === other.id;
    }
    /* =======================================================
     * Debug
     * =======================================================
     */
    debugInfo() {
        return {
            id: this.id,
            type: SketchEntityType[this.type],
            version: this.version,
            flags: this.flags,
            visible: this.visible,
            selected: this.selected,
            fixed: this.fixed,
            construction: this.construction,
            boundingBox: this.getBoundingBox()
        };
    }
}
/* ============================================================
 * Sketch Point
 * ============================================================
 */
export class SketchPoint extends SketchEntity {
    position;
    constructor(id, position) {
        super(id, SketchEntityType.Point);
        this.position = position.clone();
    }
    getPoints() {
        return [this.position];
    }
    getAnchorPoints() {
        return [
            {
                id: `${this.id}:P`,
                position: this.position
            }
        ];
    }
    getHandles() {
        return [
            {
                id: `${this.id}:H`,
                position: this.position
            }
        ];
    }
    move(delta) {
        if (!this.canModify())
            return;
        this.translatePoint(this.position, delta);
        this.invalidateGeometry();
    }
    rotate(center, angle) {
        if (!this.canModify())
            return;
        this.rotatePoint(this.position, center, angle);
        this.invalidateGeometry();
    }
    scale(center, factor) {
        if (!this.canModify())
            return;
        this.scalePoint(this.position, center, factor);
        this.invalidateGeometry();
    }
    clone() {
        const p = new SketchPoint(crypto.randomUUID(), this.position);
        p.restoreBaseState(this.serialize());
        return p;
    }
    rebuild() {
        this.clearDirty();
    }
    serialize() {
        return {
            ...super.serialize(),
            position: {
                x: this.position.x,
                y: this.position.y
            }
        };
    }
}
/* ============================================================
 * Sketch Line
 * ============================================================
 */
export class SketchLine extends SketchEntity {
    start;
    end;
    constructor(id, start, end) {
        super(id, SketchEntityType.Line);
        this.start = start.clone();
        this.end = end.clone();
    }
    /* =======================================================
     * Geometry
     * =======================================================
     */
    getPoints() {
        return [
            this.start,
            this.end
        ];
    }
    getAnchorPoints() {
        return [
            {
                id: `${this.id}:S`,
                position: this.start
            },
            {
                id: `${this.id}:E`,
                position: this.end
            }
        ];
    }
    getHandles() {
        return [
            {
                id: `${this.id}:S`,
                position: this.start
            },
            {
                id: `${this.id}:E`,
                position: this.end
            }
        ];
    }
    /* =======================================================
     * Metrics
     * =======================================================
     */
    length() {
        return this.start.distanceTo(this.end);
    }
    direction() {
        return new Vector2(this.end.x - this.start.x, this.end.y - this.start.y).normalize();
    }
    midpoint() {
        return new Vector2((this.start.x + this.end.x) * 0.5, (this.start.y + this.end.y) * 0.5);
    }
    /* =======================================================
     * Closest Point
     * =======================================================
     */
    closestPoint(point) {
        const ax = this.start.x;
        const ay = this.start.y;
        const bx = this.end.x;
        const by = this.end.y;
        const abx = bx - ax;
        const aby = by - ay;
        const apx = point.x - ax;
        const apy = point.y - ay;
        const ab2 = abx * abx +
            aby * aby;
        if (ab2 === 0) {
            return this.start.clone();
        }
        let t = (apx * abx +
            apy * aby) / ab2;
        t = Math.max(0, Math.min(1, t));
        return new Vector2(ax + abx * t, ay + aby * t);
    }
    distanceTo(point) {
        return this.closestPoint(point).distanceTo(point);
    }
    /* =======================================================
     * Transform
     * =======================================================
     */
    move(delta) {
        if (!this.canModify())
            return;
        this.translatePoint(this.start, delta);
        this.translatePoint(this.end, delta);
        this.invalidateGeometry();
    }
    rotate(center, angle) {
        if (!this.canModify())
            return;
        this.rotatePoint(this.start, center, angle);
        this.rotatePoint(this.end, center, angle);
        this.invalidateGeometry();
    }
    scale(center, factor) {
        if (!this.canModify())
            return;
        this.scalePoint(this.start, center, factor);
        this.scalePoint(this.end, center, factor);
        this.invalidateGeometry();
    }
    /* =======================================================
     * Clone
     * =======================================================
     */
    clone() {
        const line = new SketchLine(crypto.randomUUID(), this.start, this.end);
        line.restoreBaseState(this.serialize());
        return line;
    }
    /* =======================================================
     * Rebuild
     * =======================================================
     */
    rebuild() {
        this.clearDirty();
    }
    /* =======================================================
     * Serialization
     * =======================================================
     */
    serialize() {
        return {
            ...super.serialize(),
            start: {
                x: this.start.x,
                y: this.start.y
            },
            end: {
                x: this.end.x,
                y: this.end.y
            }
        };
    }
}
/* ============================================================
 * SketchCircle
 * ============================================================
 */
export class SketchCircle extends SketchEntity {
    center;
    radius;
    constructor(id, center, radius) {
        super(id, SketchEntityType.Circle);
        this.center = center.clone();
        this.radius = radius;
    }
    /* =======================================================
     * Geometry
     * =======================================================
     */
    getPoints() {
        return [
            this.center
        ];
    }
    getAnchorPoints() {
        return [
            {
                id: `${this.id}:CENTER`,
                position: this.center
            }
        ];
    }
    getHandles() {
        return [
            {
                id: `${this.id}:CENTER`,
                position: this.center
            },
            {
                id: `${this.id}:RADIUS`,
                position: new Vector2(this.center.x + this.radius, this.center.y)
            }
        ];
    }
    /* =======================================================
     * Closest Point
     * =======================================================
     */
    closestPoint(point) {
        const dir = new Vector2(point.x - this.center.x, point.y - this.center.y);
        if (dir.length() === 0) {
            return new Vector2(this.center.x + this.radius, this.center.y);
        }
        dir.normalize();
        return new Vector2(this.center.x +
            dir.x * this.radius, this.center.y +
            dir.y * this.radius);
    }
    distanceTo(point) {
        return Math.abs(this.center.distanceTo(point)
            - this.radius);
    }
    /* =======================================================
     * Transform
     * =======================================================
     */
    move(delta) {
        if (!this.canModify())
            return;
        this.translatePoint(this.center, delta);
        this.invalidateGeometry();
    }
    rotate(center, angle) {
        if (!this.canModify())
            return;
        this.rotatePoint(this.center, center, angle);
        this.invalidateGeometry();
    }
    scale(center, factor) {
        if (!this.canModify())
            return;
        this.scalePoint(this.center, center, factor);
        this.radius *= factor;
        this.invalidateGeometry();
    }
    /* =======================================================
     * Clone
     * =======================================================
     */
    clone() {
        const c = new SketchCircle(crypto.randomUUID(), this.center, this.radius);
        c.restoreBaseState(this.serialize());
        return c;
    }
    rebuild() {
        this.clearDirty();
    }
    serialize() {
        return {
            ...super.serialize(),
            center: {
                x: this.center.x,
                y: this.center.y
            },
            radius: this.radius
        };
    }
}
/* ============================================================
 * SketchArc
 * ============================================================
 */
export class SketchArc extends SketchEntity {
    center;
    radius;
    startAngle;
    endAngle;
    constructor(id, center, radius, startAngle, endAngle) {
        super(id, SketchEntityType.Arc);
        this.center = center.clone();
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
    getPoints() {
        return [
            this.center,
            this.getStartPoint(),
            this.getEndPoint()
        ];
    }
    getAnchorPoints() {
        return [
            {
                id: `${this.id}:CENTER`,
                position: this.center
            },
            {
                id: `${this.id}:START`,
                position: this.getStartPoint()
            },
            {
                id: `${this.id}:END`,
                position: this.getEndPoint()
            }
        ];
    }
    getHandles() {
        return this.getAnchorPoints().map(a => ({
            id: a.id,
            position: a.position
        }));
    }
    getStartPoint() {
        return new Vector2(this.center.x +
            Math.cos(this.startAngle) *
                this.radius, this.center.y +
            Math.sin(this.startAngle) *
                this.radius);
    }
    getEndPoint() {
        return new Vector2(this.center.x +
            Math.cos(this.endAngle) *
                this.radius, this.center.y +
            Math.sin(this.endAngle) *
                this.radius);
    }
    /* =======================================================
     * Closest Point
     * =======================================================
     */
    closestPoint(point) {
        let angle = Math.atan2(point.y - this.center.y, point.x - this.center.x);
        // açıyı ark aralığına sınırla
        angle = this.clampAngle(angle);
        return new Vector2(this.center.x +
            Math.cos(angle) * this.radius, this.center.y +
            Math.sin(angle) * this.radius);
    }
    distanceTo(point) {
        return this.closestPoint(point)
            .distanceTo(point);
    }
    /* =======================================================
     * Transform
     * =======================================================
     */
    move(delta) {
        if (!this.canModify())
            return;
        this.translatePoint(this.center, delta);
        this.invalidateGeometry();
    }
    rotate(center, angle) {
        if (!this.canModify())
            return;
        this.rotatePoint(this.center, center, angle);
        this.startAngle += angle;
        this.endAngle += angle;
        this.invalidateGeometry();
    }
    scale(center, factor) {
        if (!this.canModify())
            return;
        this.scalePoint(this.center, center, factor);
        this.radius *= factor;
        this.invalidateGeometry();
    }
    /* =======================================================
     * Utilities
     * =======================================================
     */
    clampAngle(angle) {
        let a = angle;
        while (a < 0)
            a += Math.PI * 2;
        while (a >= Math.PI * 2)
            a -= Math.PI * 2;
        let start = this.startAngle;
        let end = this.endAngle;
        while (start < 0)
            start += Math.PI * 2;
        while (end < 0)
            end += Math.PI * 2;
        while (start >= Math.PI * 2)
            start -= Math.PI * 2;
        while (end >= Math.PI * 2)
            end -= Math.PI * 2;
        if (start <= end) {
            if (a < start)
                return start;
            if (a > end)
                return end;
            return a;
        }
        // açı 0°'ı geçiyor
        if (a >= start ||
            a <= end) {
            return a;
        }
        const ds = Math.abs(a - start);
        const de = Math.abs(a - end);
        return ds < de
            ? start
            : end;
    }
    /* =======================================================
     * Clone
     * =======================================================
     */
    clone() {
        const arc = new SketchArc(crypto.randomUUID(), this.center, this.radius, this.startAngle, this.endAngle);
        arc.restoreBaseState(this.serialize());
        return arc;
    }
    /* =======================================================
     * Rebuild
     * =======================================================
     */
    rebuild() {
        this.clearDirty();
    }
    /* =======================================================
     * Serialization
     * =======================================================
     */
    serialize() {
        return {
            ...super.serialize(),
            center: {
                x: this.center.x,
                y: this.center.y
            },
            radius: this.radius,
            startAngle: this.startAngle,
            endAngle: this.endAngle
        };
    }
}
//# sourceMappingURL=SketchEntity.js.map