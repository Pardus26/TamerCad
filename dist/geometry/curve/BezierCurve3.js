import { Curve3 } from "./Curve3";
import { Point3 } from "../point/Point3";
export class BezierCurve3 extends Curve3 {
    controlPoints;
    constructor(controlPoints) {
        super();
        if (controlPoints.length < 2) {
            throw new Error("Bezier curve requires at least 2 control points");
        }
        this.controlPoints =
            controlPoints.map(p => p.clone());
    }
    /**
     * Degree of Bezier curve
     */
    degree() {
        return this.controlPoints.length - 1;
    }
    /**
     * De Casteljau algorithm
     */
    evaluate(t) {
        let points = this.controlPoints.map(p => p.clone());
        while (points.length > 1) {
            const next = [];
            for (let i = 0; i < points.length - 1; i++) {
                const a = points[i];
                const b = points[i + 1];
                next.push(new Point3(a.x +
                    (b.x - a.x) * t, a.y +
                    (b.y - a.y) * t, a.z +
                    (b.z - a.z) * t));
            }
            points = next;
        }
        return points[0];
    }
    startPoint() {
        return this.controlPoints[0]
            .clone();
    }
    endPoint() {
        return this.controlPoints[this.controlPoints.length - 1]
            .clone();
    }
    tangent(t) {
        const delta = 0.00001;
        const p1 = this.evaluate(Math.max(0, t - delta));
        const p2 = this.evaluate(Math.min(1, t + delta));
        return p2
            .subtract(p1)
            .normalize();
    }
    length(segments = 100) {
        let total = 0;
        let previous = this.evaluate(0);
        for (let i = 1; i <= segments; i++) {
            const current = this.evaluate(i / segments);
            total +=
                previous.distanceTo(current);
            previous =
                current;
        }
        return total;
    }
    addControlPoint(point) {
        this.controlPoints.push(point.clone());
    }
    removeControlPoint(index) {
        if (index >= 0 &&
            index < this.controlPoints.length) {
            this.controlPoints.splice(index, 1);
        }
    }
    getControlPoints() {
        return this.controlPoints.map(p => p.clone());
    }
    reverse() {
        return new BezierCurve3([
            ...this.controlPoints
        ]
            .reverse());
    }
    clone() {
        return new BezierCurve3(this.controlPoints.map(p => p.clone()));
    }
    toString() {
        return (`BezierCurve3(Degree:${this.degree()}, ` +
            `ControlPoints:${this.controlPoints.length})`);
    }
}
//# sourceMappingURL=BezierCurve3.js.map