import { Curve3 } from "./Curve3";
import { Vector3 } from "../../math/vector/Vector3";
export class CircleCurve3 extends Curve3 {
    center;
    radius;
    normal;
    constructor(center, radius, normal = new Vector3(0, 0, 1)) {
        super();
        this.center = center;
        this.radius = radius;
        this.normal =
            normal.normalize();
    }
    /**
     * Circle parametric evaluation
     *
     * t:
     * 0 -> 1
     *
     * 0-1 arası tam tur
     */
    evaluate(t) {
        const angle = Math.PI * 2 * t;
        let reference = new Vector3(1, 0, 0);
        /*
            Normal X eksenine paralel ise
            farklı referans seç
        */
        if (Math.abs(this.normal.dot(reference)) > 0.9) {
            reference =
                new Vector3(0, 1, 0);
        }
        const u = this.normal
            .cross(reference)
            .normalize();
        const v = this.normal
            .cross(u)
            .normalize();
        const point = u.multiply(Math.cos(angle) *
            this.radius)
            .add(v.multiply(Math.sin(angle) *
            this.radius));
        return this.center.add(point);
    }
    startPoint() {
        return this.evaluate(0);
    }
    endPoint() {
        return this.evaluate(1);
    }
    length() {
        return (2 *
            Math.PI *
            this.radius);
    }
    tangent(t) {
        const delta = 0.00001;
        const p1 = this.evaluate(t);
        const p2 = this.evaluate(t + delta);
        return p2
            .subtract(p1)
            .normalize();
    }
    circumference() {
        return this.length();
    }
    pointAtAngle(angle) {
        const t = angle /
            (Math.PI * 2);
        return this.evaluate(t);
    }
    containsPoint(point, tolerance = 0.000001) {
        const distance = this.center
            .distanceTo(point);
        return Math.abs(distance -
            this.radius)
            < tolerance;
    }
    reverse() {
        return new CircleCurve3(this.center.clone(), this.radius, this.normal
            .multiply(-1));
    }
    clone() {
        return new CircleCurve3(this.center.clone(), this.radius, new Vector3(this.normal.x, this.normal.y, this.normal.z));
    }
    toString() {
        return (`CircleCurve3(` +
            `Center:${this.center.toString()}, ` +
            `Radius:${this.radius})`);
    }
}
//# sourceMappingURL=CircleCurve3.js.map