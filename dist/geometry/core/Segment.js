import { Point } from "./Point";
import { Direction } from "./Direction";
import { Line } from "./Line";
export class Segment {
    start;
    end;
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    direction() {
        return Direction.fromPoints(this.start, this.end);
    }
    length() {
        return this.start.distanceTo(this.end);
    }
    midpoint() {
        return new Point((this.start.x +
            this.end.x) / 2, (this.start.y +
            this.end.y) / 2, (this.start.z +
            this.end.z) / 2);
    }
    pointAt(t) {
        return new Point(this.start.x +
            (this.end.x -
                this.start.x)
                *
                    t, this.start.y +
            (this.end.y -
                this.start.y)
                *
                    t, this.start.z +
            (this.end.z -
                this.start.z)
                *
                    t);
    }
    containsPoint(point, tolerance = 1e-6) {
        const line = this.toLine();
        const distance = line.distanceToPoint(point);
        if (distance > tolerance) {
            return false;
        }
        const t = line.closestParameter(point);
        return (t >= -tolerance
            &&
                t <= this.length() + tolerance);
    }
    projectPoint(point) {
        const line = this.toLine();
        const projected = line.projectPoint(point);
        const t = this.parameterOf(projected);
        if (t < 0)
            return this.start.clone();
        if (t > 1)
            return this.end.clone();
        return projected;
    }
    parameterOf(point) {
        const length = this.length();
        if (length === 0)
            return 0;
        return (point.distanceTo(this.start)
            /
                length);
    }
    toLine() {
        return new Line(this.start.clone(), this.direction());
    }
    reverse() {
        return new Segment(this.end.clone(), this.start.clone());
    }
    transform(transform) {
        return new Segment(transform.applyToPoint(this.start), transform.applyToPoint(this.end));
    }
    clone() {
        return new Segment(this.start.clone(), this.end.clone());
    }
    static fromLine(line, length) {
        return new Segment(line.pointAt(0), line.pointAt(length));
    }
}
//# sourceMappingURL=Segment.js.map