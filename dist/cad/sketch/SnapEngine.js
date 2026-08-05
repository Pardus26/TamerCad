import { Vector2 } from "../../math/vector/Vector2";
import { SketchPoint, SketchLine, SketchCircle } from "./SketchEntity";
/* ======================================================
 * Snap Types
 * ====================================================== */
export var SnapType;
(function (SnapType) {
    SnapType[SnapType["None"] = 0] = "None";
    SnapType[SnapType["Endpoint"] = 1] = "Endpoint";
    SnapType[SnapType["Midpoint"] = 2] = "Midpoint";
    SnapType[SnapType["Center"] = 3] = "Center";
    SnapType[SnapType["Intersection"] = 4] = "Intersection";
    SnapType[SnapType["Grid"] = 5] = "Grid";
    SnapType[SnapType["Angle"] = 6] = "Angle";
    SnapType[SnapType["Tangent"] = 7] = "Tangent";
    SnapType[SnapType["Quadrant"] = 8] = "Quadrant";
    SnapType[SnapType["Projection"] = 9] = "Projection";
})(SnapType || (SnapType = {}));
/* ======================================================
 * Snap Engine
 * ====================================================== */
export class SnapEngine {
    snapDistance;
    gridSize;
    angleStep;
    enableGrid;
    enableAngleSnap;
    constructor(options = {}) {
        this.snapDistance =
            options.snapDistance ?? 12;
        this.gridSize =
            options.gridSize ?? 10;
        this.angleStep =
            options.angleStep ?? 15;
        this.enableGrid =
            options.enableGrid ?? true;
        this.enableAngleSnap =
            options.enableAngleSnap ?? true;
    }
    /* ======================================================
     * Main Snap Entry
     * ====================================================== */
    snap(position, entities) {
        let best = {
            snapped: false,
            position: position.clone(),
            type: SnapType.None,
            distance: Number.MAX_VALUE
        };
        for (const entity of entities) {
            best = this.checkEntity(position, entity, best);
        }
        if (!best.snapped &&
            this.enableGrid) {
            best = this.gridSnap(position);
        }
        return best;
    }
    /* ======================================================
     * Entity Snap Dispatcher
     * ====================================================== */
    checkEntity(position, entity, current) {
        if (entity instanceof SketchPoint) {
            current = this.pointSnap(position, entity, current);
        }
        else if (entity instanceof SketchLine) {
            current = this.endpointSnap(position, entity, current);
            current = this.midpointSnap(position, entity, current);
            current = this.projectionSnap(position, entity, current);
        }
        else if (entity instanceof SketchCircle) {
            current = this.centerSnap(position, entity, current);
            current = this.quadrantSnap(position, entity, current);
        }
        return current;
    }
    /* ======================================================
     * Point Snap
     * ====================================================== */
    pointSnap(position, entity, current) {
        const d = entity.position.distanceTo(position);
        if (d < this.snapDistance &&
            d < current.distance) {
            return {
                snapped: true,
                position: entity.position.clone(),
                type: SnapType.Endpoint,
                entity,
                distance: d,
                constraint: "Coincident"
            };
        }
        return current;
    }
    /* ======================================================
     * Endpoint Snap
     * ====================================================== */
    endpointSnap(position, entity, current) {
        const pts = [
            entity.start,
            entity.end
        ];
        for (const p of pts) {
            const d = p.distanceTo(position);
            if (d < this.snapDistance &&
                d < current.distance) {
                return {
                    snapped: true,
                    position: p.clone(),
                    type: SnapType.Endpoint,
                    entity,
                    distance: d,
                    constraint: "Coincident"
                };
            }
        }
        return current;
    }
    /* ======================================================
     * Midpoint Snap
     * ====================================================== */
    midpointSnap(position, entity, current) {
        const midpoint = new Vector2((entity.start.x + entity.end.x) * 0.5, (entity.start.y + entity.end.y) * 0.5);
        const d = midpoint.distanceTo(position);
        if (d < this.snapDistance &&
            d < current.distance) {
            return {
                snapped: true,
                position: midpoint,
                type: SnapType.Midpoint,
                entity,
                distance: d,
                constraint: "Midpoint"
            };
        }
        return current;
    }
    /* ======================================================
     * Projection Snap
     * ====================================================== */
    projectionSnap(position, entity, current) {
        const projected = this.projectPointToSegment(position, entity.start, entity.end);
        const d = projected.distanceTo(position);
        if (d < this.snapDistance &&
            d < current.distance) {
            return {
                snapped: true,
                position: projected,
                type: SnapType.Projection,
                entity,
                distance: d,
                constraint: "HorizontalVertical"
            };
        }
        return current;
    }
    /* ======================================================
     * Point Projection Helper
     * ====================================================== */
    projectPointToSegment(point, start, end) {
        const ab = end.clone().sub(start);
        const ap = point.clone().sub(start);
        const abLengthSq = ab.dot(ab);
        if (abLengthSq <= 1e-9) {
            return start.clone();
        }
        let t = ap.dot(ab) / abLengthSq;
        t = Math.max(0, Math.min(1, t));
        return start.clone().add(ab.multiplyScalar(t));
    }
    /* ======================================================
     * Circle Center Snap
     * ====================================================== */
    centerSnap(position, entity, current) {
        const d = entity.center.distanceTo(position);
        if (d < this.snapDistance &&
            d < current.distance) {
            return {
                snapped: true,
                position: entity.center.clone(),
                type: SnapType.Center,
                entity,
                distance: d,
                constraint: "Center"
            };
        }
        return current;
    }
    /* ======================================================
     * Circle Quadrant Snap
     * ====================================================== */
    quadrantSnap(position, entity, current) {
        const candidates = [
            new Vector2(entity.center.x +
                entity.radius, entity.center.y),
            new Vector2(entity.center.x -
                entity.radius, entity.center.y),
            new Vector2(entity.center.x, entity.center.y +
                entity.radius),
            new Vector2(entity.center.x, entity.center.y -
                entity.radius)
        ];
        for (const point of candidates) {
            const d = point.distanceTo(position);
            if (d < this.snapDistance &&
                d < current.distance) {
                return {
                    snapped: true,
                    position: point,
                    type: SnapType.Quadrant,
                    entity,
                    distance: d,
                    constraint: "Quadrant"
                };
            }
        }
        return current;
    }
    /* ======================================================
     * Grid Snap
     * ====================================================== */
    gridSnap(position) {
        const x = Math.round(position.x /
            this.gridSize)
            *
                this.gridSize;
        const y = Math.round(position.y /
            this.gridSize)
            *
                this.gridSize;
        const snapped = new Vector2(x, y);
        const d = snapped.distanceTo(position);
        if (d < this.snapDistance) {
            return {
                snapped: true,
                position: snapped,
                type: SnapType.Grid,
                distance: d,
                constraint: "Grid"
            };
        }
        return {
            snapped: false,
            position: position.clone(),
            type: SnapType.None,
            distance: d
        };
    }
    /* ======================================================
     * Angle Snap
     * ====================================================== */
    snapAngle(start, end) {
        if (!this.enableAngleSnap) {
            return end.clone();
        }
        const dx = end.x -
            start.x;
        const dy = end.y -
            start.y;
        const length = Math.sqrt(dx * dx +
            dy * dy);
        if (length < 0.00001) {
            return end.clone();
        }
        const angle = Math.atan2(dy, dx);
        const degrees = angle *
            180 /
            Math.PI;
        const snappedDegrees = Math.round(degrees /
            this.angleStep)
            *
                this.angleStep;
        const radians = snappedDegrees *
            Math.PI /
            180;
        return new Vector2(start.x +
            Math.cos(radians)
                *
                    length, start.y +
            Math.sin(radians)
                *
                    length);
    }
    /* ======================================================
     * Intersection Snap
     * ====================================================== */
    intersectionSnap(position, entities, current) {
        for (let i = 0; i < entities.length; i++) {
            const a = entities[i];
            if (!(a instanceof SketchLine)) {
                continue;
            }
            for (let j = i + 1; j < entities.length; j++) {
                const b = entities[j];
                if (!(b instanceof SketchLine)) {
                    continue;
                }
                const intersection = this.lineIntersection(a.start, a.end, b.start, b.end);
                if (!intersection) {
                    continue;
                }
                const d = intersection.distanceTo(position);
                if (d < this.snapDistance &&
                    d < current.distance) {
                    return {
                        snapped: true,
                        position: intersection,
                        type: SnapType.Intersection,
                        entity: a,
                        distance: d,
                        constraint: "Intersection"
                    };
                }
            }
        }
        return current;
    }
    /* ======================================================
     * Line Intersection Helper
     * ====================================================== */
    lineIntersection(p1, p2, p3, p4) {
        const denominator = (p1.x - p2.x)
            *
                (p3.y - p4.y)
            -
                (p1.y - p2.y)
                    *
                        (p3.x - p4.x);
        if (Math.abs(denominator)
            < 0.000001) {
            return null;
        }
        const x = ((p1.x * p2.y -
            p1.y * p2.x)
            *
                (p3.x - p4.x)
            -
                (p1.x - p2.x)
                    *
                        (p3.x * p4.y -
                            p3.y * p4.x))
            /
                denominator;
        const y = ((p1.x * p2.y -
            p1.y * p2.x)
            *
                (p3.y - p4.y)
            -
                (p1.y - p2.y)
                    *
                        (p3.x * p4.y -
                            p3.y * p4.x))
            /
                denominator;
        return new Vector2(x, y);
    }
    /* ======================================================
     * Tangent Snap
     * ====================================================== */
    tangentSnap(position, entity, current) {
        const direction = position.clone()
            .sub(entity.center);
        const length = direction.length();
        if (length === 0) {
            return current;
        }
        const tangentPoint = entity.center.clone()
            .add(direction
            .normalize()
            .multiplyScalar(entity.radius));
        const distance = tangentPoint.distanceTo(position);
        if (distance < this.snapDistance &&
            distance < current.distance) {
            return {
                snapped: true,
                position: tangentPoint,
                type: SnapType.Tangent,
                entity,
                distance,
                constraint: "Tangent"
            };
        }
        return current;
    }
    /* ======================================================
     * Priority Comparison
     * ====================================================== */
    better(candidate, current) {
        if (!candidate.snapped) {
            return false;
        }
        if (!current.snapped) {
            return true;
        }
        const priority = [
            SnapType.Intersection,
            SnapType.Endpoint,
            SnapType.Center,
            SnapType.Midpoint,
            SnapType.Quadrant,
            SnapType.Tangent,
            SnapType.Projection,
            SnapType.Grid
        ];
        const candidatePriority = priority.indexOf(candidate.type);
        const currentPriority = priority.indexOf(current.type);
        if (candidatePriority !==
            currentPriority) {
            return (candidatePriority <
                currentPriority);
        }
        return (candidate.distance <
            current.distance);
    }
    /* ======================================================
     * Public Debug
     * ====================================================== */
    debugInfo() {
        return {
            snapDistance: this.snapDistance,
            gridSize: this.gridSize,
            angleStep: this.angleStep,
            gridEnabled: this.enableGrid,
            angleSnapEnabled: this.enableAngleSnap
        };
    }
}
//# sourceMappingURL=SnapEngine.js.map