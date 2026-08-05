import { Point } from "./Point";
import { Direction } from "./Direction";
export class Axis {
    origin;
    direction;
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
    pointAt(distance) {
        const offset = this.direction
            .toVector()
            .multiply(distance);
        return this.origin.addVector(offset);
    }
    projectPoint(point) {
        const vector = point.subtract(this.origin);
        const distance = vector.dot(this.direction.toVector());
        return this.pointAt(distance);
    }
    distanceToPoint(point) {
        const projection = this.projectPoint(point);
        return point.distanceTo(projection);
    }
    reverse() {
        return new Axis(this.origin.clone(), this.direction.reverse());
    }
    transform(transform) {
        return new Axis(transform.applyToPoint(this.origin), transform.applyToVector(this.direction.toVector())
            instanceof Direction
            ?
                transform.applyToVector(this.direction.toVector())
            :
                new Direction(transform.applyToVector(this.direction.toVector())));
    }
    equals(other) {
        return (this.origin.equals(other.origin)
            &&
                this.direction.equals(other.direction));
    }
    static X_AXIS() {
        return new Axis(new Point(), Direction.X());
    }
    static Y_AXIS() {
        return new Axis(new Point(), Direction.Y());
    }
    static Z_AXIS() {
        return new Axis(new Point(), Direction.Z());
    }
}
//# sourceMappingURL=Axis.js.map