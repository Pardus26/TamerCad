import { Point3 } from "../point/Point3";
export class Surface3 {
    id;
    constructor() {
        this.id =
            crypto.randomUUID();
    }
    /**
     * Surface normal hesaplama
     */
    normal(u, v) {
        const delta = 0.000001;
        const p = this.evaluate(u, v);
        const pu = this.evaluate(u + delta, v)
            .subtract(p);
        const pv = this.evaluate(u, v + delta)
            .subtract(p);
        return pu
            .cross(pv)
            .normalize();
    }
    /**
     * Surface üzerinde nokta örnekleme
     */
    sample(uSegments = 20, vSegments = 20) {
        const points = [];
        for (let i = 0; i <= uSegments; i++) {
            const u = i / uSegments;
            for (let j = 0; j <= vSegments; j++) {
                const v = j / vSegments;
                points.push(this.evaluate(u, v));
            }
        }
        return points;
    }
    /**
     * Bounding box
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
    /**
     * Surface alanı yaklaşık hesabı
     */
    area(uSegments = 50, vSegments = 50) {
        let total = 0;
        for (let i = 0; i < uSegments; i++) {
            for (let j = 0; j < vSegments; j++) {
                const u1 = i / uSegments;
                const v1 = j / vSegments;
                const u2 = (i + 1) / uSegments;
                const v2 = (j + 1) / vSegments;
                const p1 = this.evaluate(u1, v1);
                const p2 = this.evaluate(u2, v1);
                const p3 = this.evaluate(u1, v2);
                const a = p2.subtract(p1);
                const b = p3.subtract(p1);
                total +=
                    a.cross(b)
                        .length()
                        * 0.5;
            }
        }
        return total;
    }
    clone() {
        throw new Error("Clone implementation required");
    }
}
//# sourceMappingURL=Surface3.js.map