import { Curve3 } from "./Curve3";
import { Point3 } from "../point/Point3";
export class LineCurve3 extends Curve3 {
    start;
    end;
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }
    /**
     * Parametric evaluation
     *
     * t = 0  başlangıç
     * t = 1  bitiş
     */
    evaluate(t) {
        return new Point3(this.start.x +
            (this.end.x -
                this.start.x) * t, this.start.y +
            (this.end.y -
                this.start.y) * t, this.start.z +
            (this.end.z -
                this.start.z) * t);
    }
    startPoint() {
        return this.start.clone();
    }
    endPoint() {
        return this.end.clone();
    }
    direction() {
        return this.end
            .subtract(this.start)
            .normalize();
    }
    length() {
        return this.start
            .distanceTo(this.end);
    }
    tangent(_t = 0) {
        return this.direction();
    }
    reverse() {
        return new LineCurve3(this.end.clone(), this.start.clone());
    }
    closestPoint(point) {
        const line = this.end
            .subtract(this.start);
        const toPoint = point.subtract(this.start);
        const lengthSquared = line.dot(line);
        if (lengthSquared === 0)
            return this.start.clone();
        let t = toPoint.dot(line)
            /
                lengthSquared;
        t =
            Math.max(0, Math.min(1, t));
        return this.evaluate(t);
    }
    split(t) {
        const middle = this.evaluate(t);
        return {
            first: new LineCurve3(this.start.clone(), middle),
            second: new LineCurve3(middle, this.end.clone())
        };
    }
    clone() {
        return new LineCurve3(this.start.clone(), this.end.clone());
    }
    toString() {
        return (`LineCurve3(` +
            `${this.start.toString()} -> ` +
            `${this.end.toString()})`);
    }
}
//# sourceMappingURL=LineCurve3.js.map