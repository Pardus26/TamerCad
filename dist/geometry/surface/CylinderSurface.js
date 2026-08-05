import { Surface } from "./Surface";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class CylinderSurface extends Surface {
    center;
    axis;
    radius;
    height;
    constructor(center, axis, radius, height = 100) {
        super();
        this.center = center;
        this.axis = axis;
        this.radius = radius;
        this.height = height;
        if (radius <= 0) {
            throw new Error("Cylinder radius must be positive");
        }
    }
    get uMin() {
        return 0;
    }
    get uMax() {
        return Math.PI * 2;
    }
    get vMin() {
        return -this.height / 2;
    }
    get vMax() {
        return this.height / 2;
    }
    basis() {
        const z = this.axis.toVector()
            .normalize();
        let x = new Vector3(1, 0, 0);
        if (Math.abs(z.dot(x))
            >
                0.99) {
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
        return this.center
            .addVector(x.multiply(Math.cos(u)
            *
                this.radius))
            .addVector(y.multiply(Math.sin(u)
            *
                this.radius))
            .addVector(z.multiply(v));
    }
    derivativeU(u, v) {
        const { x, y } = this.basis();
        return (x.multiply(-Math.sin(u)
            *
                this.radius)
            .add(y.multiply(Math.cos(u)
            *
                this.radius)));
    }
    derivativeV(u, v) {
        return this.axis
            .toVector()
            .normalize();
    }
    boundingBox() {
        const { x, y, z } = this.basis();
        const r = this.radius;
        const h = this.height / 2;
        return new BoundingBox(this.center
            .addVector(new Vector3(-r, -r, -h)), this.center
            .addVector(new Vector3(r, r, h)));
    }
    reverse() {
        return new CylinderSurface(this.center.clone(), this.axis.reverse(), this.radius, this.height);
    }
    transform(transform) {
        return new CylinderSurface(transform.applyToPoint(this.center), this.axis.transform(transform), this.radius, this.height);
    }
}
//# sourceMappingURL=CylinderSurface.js.map