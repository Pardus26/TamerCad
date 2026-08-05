import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class SphereSurface extends Surface {
    center;
    radius;
    constructor(center, radius) {
        super();
        this.center = center;
        this.radius = radius;
        if (radius <= 0) {
            throw new Error("Sphere radius must be positive");
        }
    }
    get uMin() {
        return 0;
    }
    get uMax() {
        return Math.PI * 2;
    }
    get vMin() {
        return -Math.PI / 2;
    }
    get vMax() {
        return Math.PI / 2;
    }
    evaluate(u, v) {
        const x = Math.cos(v)
            *
                Math.cos(u)
            *
                this.radius;
        const y = Math.cos(v)
            *
                Math.sin(u)
            *
                this.radius;
        const z = Math.sin(v)
            *
                this.radius;
        return this.center
            .addVector(new Vector3(x, y, z));
    }
    derivativeU(u, v) {
        return new Vector3(-Math.cos(v)
            *
                Math.sin(u)
            *
                this.radius, Math.cos(v)
            *
                Math.cos(u)
            *
                this.radius, 0);
    }
    derivativeV(u, v) {
        return new Vector3(-Math.sin(v)
            *
                Math.cos(u)
            *
                this.radius, -Math.sin(v)
            *
                Math.sin(u)
            *
                this.radius, Math.cos(v)
            *
                this.radius);
    }
    boundingBox() {
        const r = this.radius;
        return new BoundingBox(new Point(this.center.x - r, this.center.y - r, this.center.z - r), new Point(this.center.x + r, this.center.y + r, this.center.z + r));
    }
    reverse() {
        return new SphereSurface(this.center.clone(), this.radius);
    }
    transform(transform) {
        return new SphereSurface(transform.applyToPoint(this.center), this.radius);
    }
}
//# sourceMappingURL=SphereSurface.js.map