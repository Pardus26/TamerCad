import { Solid3 } from "./Solid3";
import { SphereSurface3 } from "../surface/SphereSurface3";
export class SphereSolid3 extends Solid3 {
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
        this.createSurface();
    }
    /**
     * Küre sınır yüzeyi
     */
    createSurface() {
        this.addSurface(new SphereSurface3(this.center, this.radius));
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
     * Kütle merkezi
     */
    centerOfMass() {
        return this.center.clone();
    }
    /**
     * Nokta küre içinde mi?
     */
    containsPoint(point) {
        return (this.center
            .distanceTo(point)
            <=
                this.radius);
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
     * Çap
     */
    diameter() {
        return (this.radius * 2);
    }
    /**
     * Yarıçap değiştirme
     */
    resize(radius) {
        if (radius <= 0) {
            throw new Error("Sphere radius must be positive");
        }
        this.radius =
            radius;
        this.surfaces = [];
        this.createSurface();
    }
    type() {
        return "SphereSolid3";
    }
    clone() {
        return new SphereSolid3(this.center.clone(), this.radius);
    }
    toString() {
        return (`SphereSolid3(` +
            `Center:${this.center.toString()}, ` +
            `Radius:${this.radius}` +
            `)`);
    }
}
//# sourceMappingURL=SphereSolid3.js.map