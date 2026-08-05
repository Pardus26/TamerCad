import { Surface3 } from "./Surface3";
import { Vector3 } from "../../math/vector/Vector3";
export class CylinderSurface3 extends Surface3 {
    origin;
    axis;
    radius;
    uDirection;
    vDirection;
    constructor(origin, axis, radius) {
        super();
        this.origin =
            origin.clone();
        this.axis =
            axis.normalize();
        this.radius =
            radius;
        if (radius <= 0) {
            throw new Error("Cylinder radius must be positive");
        }
        /*
            Silindir lokal koordinat sistemi
        */
        let reference = new Vector3(1, 0, 0);
        if (Math.abs(this.axis.dot(reference)) > 0.9) {
            reference =
                new Vector3(0, 1, 0);
        }
        this.uDirection =
            this.axis
                .cross(reference)
                .normalize();
        this.vDirection =
            this.axis
                .cross(this.uDirection)
                .normalize();
    }
    /**
     * Silindir parametrik yüzeyi
     *
     * u : açı 0-1
     * v : eksen uzaklığı
     *
     * P(u,v)
     */
    evaluate(u, v) {
        const angle = Math.PI * 2 * u;
        const circleOffset = this.uDirection
            .multiply(Math.cos(angle) *
            this.radius)
            .add(this.vDirection
            .multiply(Math.sin(angle) *
            this.radius));
        const heightOffset = this.axis
            .multiply(v);
        return this.origin
            .add(circleOffset)
            .add(heightOffset);
    }
    startPoint() {
        return this.evaluate(0, 0);
    }
    normal(u, _v) {
        const angle = Math.PI * 2 * u;
        return this.uDirection
            .multiply(Math.cos(angle))
            .add(this.vDirection
            .multiply(Math.sin(angle)))
            .normalize();
    }
    /**
     * Silindir üzerindeki nokta kontrolü
     */
    containsPoint(point, tolerance = 0.000001) {
        const relative = point.subtract(this.origin);
        const height = relative.dot(this.axis);
        const projection = relative.subtract(this.axis
            .multiply(height));
        return Math.abs(projection.length()
            -
                this.radius)
            < tolerance;
    }
    /**
     * Yarıçap değişimi
     */
    setRadius(radius) {
        if (radius <= 0) {
            throw new Error("Radius must be positive");
        }
        this.radius =
            radius;
    }
    /**
     * Silindir çevresi
     */
    circumference() {
        return (2 *
            Math.PI *
            this.radius);
    }
    type() {
        return "CylinderSurface3";
    }
    clone() {
        return new CylinderSurface3(this.origin.clone(), new Vector3(this.axis.x, this.axis.y, this.axis.z), this.radius);
    }
    toString() {
        return (`CylinderSurface3(` +
            `Radius:${this.radius}, ` +
            `Axis:` +
            `${this.axis.x},` +
            `${this.axis.y},` +
            `${this.axis.z}` +
            `)`);
    }
}
//# sourceMappingURL=CylinderSurface3.js.map