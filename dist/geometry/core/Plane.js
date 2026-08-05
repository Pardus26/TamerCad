import { Point } from "./Point";
import { Direction } from "./Direction";
export class Plane {
    origin;
    normal;
    constructor(origin, normal) {
        this.origin = origin;
        this.normal = normal;
    }
    /**
     * Noktanın düzleme izdüşümü
     */
    projectPoint(point) {
        const vector = point.subtract(this.origin);
        const distance = vector.dot(this.normal.toVector());
        const correction = this.normal
            .toVector()
            .multiply(distance);
        return point.addVector(correction.multiply(-1));
    }
    /**
     * Noktanın düzleme uzaklığı
     */
    distanceToPoint(point) {
        const vector = point.subtract(this.origin);
        return Math.abs(vector.dot(this.normal.toVector()));
    }
    /**
     * Nokta düzlem üzerinde mi?
     */
    containsPoint(point, tolerance = 1e-6) {
        return (this.distanceToPoint(point)
            <
                tolerance);
    }
    /**
     * Doğru düzleme paralel mi?
     */
    isLineParallel(line) {
        return this.normal
            .isPerpendicular(line.direction);
    }
    /**
     * Düzlemin karşı tarafı
     */
    sideOfPoint(point) {
        const value = point.subtract(this.origin)
            .dot(this.normal.toVector());
        if (value > 0)
            return 1;
        if (value < 0)
            return -1;
        return 0;
    }
    /**
     * Normal yönünü ters çevirir
     */
    reverse() {
        return new Plane(this.origin.clone(), this.normal.reverse());
    }
    transform(transform) {
        return new Plane(transform.applyToPoint(this.origin), new Direction(transform.applyToVector(this.normal.toVector())));
    }
    /**
     * Üç noktadan düzlem oluşturma
     */
    static fromPoints(a, b, c) {
        const ab = b.subtract(a);
        const ac = c.subtract(a);
        const normal = new Direction(ab.cross(ac));
        return new Plane(a.clone(), normal);
    }
    static XY() {
        return new Plane(new Point(), Direction.Z());
    }
    static XZ() {
        return new Plane(new Point(), Direction.Y());
    }
    static YZ() {
        return new Plane(new Point(), Direction.X());
    }
}
//# sourceMappingURL=Plane.js.map