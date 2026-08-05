import { Curve } from "./Curve";
import { Point } from "../core/Point";
import { Direction } from "../core/Direction";
import { Line } from "../core/Line";
import { BoundingBox } from "../core/BoundingBox";
export class LineCurve extends Curve {
    line;
    constructor(origin, direction) {
        super();
        this.line =
            new Line(origin, direction);
    }
    get startParameter() {
        return -Infinity;
    }
    get endParameter() {
        return Infinity;
    }
    evaluate(t) {
        return this.line.pointAt(t);
    }
    derivative(t) {
        return this.line.direction
            .toVector();
    }
    length() {
        return Infinity;
    }
    boundingBox() {
        return new BoundingBox(new Point(-Infinity, -Infinity, -Infinity), new Point(Infinity, Infinity, Infinity));
    }
    closestPoint(point) {
        return this.line.projectPoint(point);
    }
    reverse() {
        return new LineCurve(this.line.origin.clone(), this.line.direction.reverse());
    }
    transform(transform) {
        return new LineCurve(transform.applyToPoint(this.line.origin), new Direction(transform.applyToVector(this.line.direction.toVector())));
    }
    getLine() {
        return this.line;
    }
    static fromPoints(start, end) {
        return new LineCurve(start, Direction.fromPoints(start, end));
    }
}
//# sourceMappingURL=LineCurve.js.map