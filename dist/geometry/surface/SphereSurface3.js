import { Surface3 } from "./Surface3";
import { Point3 } from "../point/Point3";
export class SphereSurface3 extends Surface3 {
    center;
    radius;
    constructor(center, radius) {
        super();
        if (radius <= 0) {
            throw new Error("Sphere radius must be positive");
        }
        this.center =
            center.clone();
        this.radius =
            radius;
    }
    /**
     * Sphere parametrik yüzeyi
     *
     * u : longitude 0-1
     * v : latitude 0-1
     */
    evaluate(u, v) {
        const theta = 2 *
            Math.PI *
            u;
        const phi = Math.PI *
            (v - 0.5);
        const x = this.radius *
            Math.cos(phi) *
            Math.cos(theta);
        const y = this.radius *
            Math.cos(phi) *
            Math.sin(theta);
        const z = this.radius *
            Math.sin(phi);
        return new Point3(this.center.x + x, this.center.y + y, this.center.z + z);
    }
    /**
     * Başlangıç noktası
     */
    startPoint() {
        return this.evaluate(0, 0.5);
    }
    /**
     * Küre normal vektörü
     */
    normal(u, v) {
        return this.evaluate(u, v)
            .subtract(this.center)
            .normalize();
    }
    /**
     * Noktanın küre üzerinde olup olmadığı
     */
    containsPoint(point, tolerance = 0.000001) {
        const distance = this.center
            .distanceTo(point);
        return Math.abs(distance -
            this.radius)
            < tolerance;
    }
    /**
     * Küre yüzey alanı
     */
    surfaceArea() {
        return (4 *
            Math.PI *
            this.radius *
            this.radius);
    }
    /**
     * Küre hacmi
     */
    volume() {
        return (4 *
            Math.PI *
            Math.pow(this.radius, 3)
            /
                3);
    }
    /**
     * Yarıçap değiştirme
     */
    setRadius(radius) {
        if (radius <= 0) {
            throw new Error("Sphere radius must be positive");
        }
        this.radius =
            radius;
    }
    type() {
        return "SphereSurface3";
    }
    clone() {
        return new SphereSurface3(this.center.clone(), this.radius);
    }
    toString() {
        return (`SphereSurface3(` +
            `Center:${this.center.toString()}, ` +
            `Radius:${this.radius}` +
            `)`);
    }
}
//# sourceMappingURL=SphereSurface3.js.map