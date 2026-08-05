import { Point3 } from "../point/Point3";
export class Curve3 {
    id;
    constructor() {
        this.id =
            crypto.randomUUID();
    }
    /**
     * Teğet vektörü
     */
    tangent(t) {
        const delta = 0.000001;
        const p1 = this.evaluate(Math.max(0, t - delta));
        const p2 = this.evaluate(Math.min(1, t + delta));
        return p2
            .subtract(p1)
            .normalize();
    }
    /**
     * Eğri üzerindeki örnekleme
     */
    sample(segments = 32) {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            points.push(this.evaluate(t));
        }
        return points;
    }
    /**
     * Bounding box hesabı
     */
    boundingBox() {
        const points = this.sample();
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        for (const p of points) {
            minX =
                Math.min(minX, p.x);
            minY =
                Math.min(minY, p.y);
            minZ =
                Math.min(minZ, p.z);
            maxX =
                Math.max(maxX, p.x);
            maxY =
                Math.max(maxY, p.y);
            maxZ =
                Math.max(maxZ, p.z);
        }
        return {
            min: new Point3(minX, minY, minZ),
            max: new Point3(maxX, maxY, maxZ)
        };
    }
    clone() {
        throw new Error("Clone implementation required");
    }
}
//# sourceMappingURL=Curve3.js.map