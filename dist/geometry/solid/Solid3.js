import { Point3 } from "../point/Point3";
export class Solid3 {
    id;
    /**
     * Katı sınır yüzeyleri
     */
    surfaces;
    constructor() {
        this.id =
            crypto.randomUUID();
        this.surfaces = [];
    }
    /**
     * Solid üzerindeki yüzeyleri döndürür
     */
    getSurfaces() {
        return [
            ...this.surfaces
        ];
    }
    /**
     * Yüzey ekleme
     */
    addSurface(surface) {
        this.surfaces.push(surface);
    }
    /**
     * Yaklaşık bounding box
     */
    boundingBox() {
        const points = [];
        for (const surface of this.surfaces) {
            points.push(...surface.sample(10, 10));
        }
        if (points.length === 0) {
            return {
                min: Point3.origin(),
                max: Point3.origin()
            };
        }
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
     * Katı doğrulama
     */
    isValid() {
        return (this.surfaces.length > 0);
    }
    /**
     * Kopyalama
     */
    clone() {
        throw new Error("Clone implementation required");
    }
    toString() {
        return (`Solid3(` +
            `Surfaces:${this.surfaces.length}` +
            `)`);
    }
}
//# sourceMappingURL=Solid3.js.map