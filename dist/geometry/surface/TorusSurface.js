import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class TorusSurface extends Surface {
    center;
    axis;
    majorRadius;
    minorRadius;
    constructor(center, axis, majorRadius, minorRadius) {
        super();
        this.center = center;
        this.axis = axis;
        this.majorRadius = majorRadius;
        this.minorRadius = minorRadius;
        if (majorRadius <= 0 ||
            minorRadius <= 0) {
            throw new Error("Invalid torus radius");
        }
    }
    get uMin() {
        return 0;
    }
    get uMax() {
        return Math.PI * 2;
    }
    get vMin() {
        return 0;
    }
    get vMax() {
        return Math.PI * 2;
    }
    basis() {
        const z = this.axis
            .toVector()
            .normalize();
        let x = new Vector3(1, 0, 0);
        if (Math.abs(z.dot(x))
            > 0.99) {
            x =
                new Vector3(0, 1, 0);
        }
        const y = z.cross(x)
            .normalize();
        x =
            y.cross(z)
                .normalize();
        return {
            x,
            y,
            z
        };
    }
    evaluate(u, v) {
        const { x, y, z } = this.basis();
        const tubeOffset = this.minorRadius *
            Math.cos(v);
        const radial = this.majorRadius +
            tubeOffset;
        return this.center
            .addVector(x.multiply(Math.cos(u)
            *
                radial))
            .addVector(y.multiply(Math.sin(u)
            *
                radial))
            .addVector(z.multiply(Math.sin(v)
            *
                this.minorRadius));
    }
    derivativeU(u, v) {
        const { x, y } = this.basis();
        const radial = this.majorRadius +
            this.minorRadius *
                Math.cos(v);
        return (x.multiply(-Math.sin(u)
            *
                radial)
            .add(y.multiply(Math.cos(u)
            *
                radial)));
    }
    derivativeV(u, v) {
        const { x, y, z } = this.basis();
        return (x.multiply(-Math.cos(u)
            *
                Math.sin(v)
            *
                this.minorRadius)
            .add(y.multiply(-Math.sin(u)
            *
                Math.sin(v)
            *
                this.minorRadius))
            .add(z.multiply(Math.cos(v)
            *
                this.minorRadius)));
    }
    boundingBox() {
        const r = this.majorRadius +
            this.minorRadius;
        return new BoundingBox(new Point(this.center.x - r, this.center.y - r, this.center.z - r), new Point(this.center.x + r, this.center.y + r, this.center.z + r));
    }
    reverse() {
        return new TorusSurface(this.center.clone(), this.axis.reverse(), this.majorRadius, this.minorRadius);
    }
    transform(transform) {
        return new TorusSurface(transform.applyToPoint(this.center), this.axis.transform(transform), this.majorRadius, this.minorRadius);
    }
}
//# sourceMappingURL=TorusSurface.js.map