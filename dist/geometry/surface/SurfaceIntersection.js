import { LineCurve } from "../curve/LineCurve";
export class SurfaceIntersection {
    surfaceA;
    surfaceB;
    tolerance;
    constructor(surfaceA, surfaceB, tolerance = 1e-6) {
        this.surfaceA = surfaceA;
        this.surfaceB = surfaceB;
        this.tolerance = tolerance;
    }
    intersect() {
        const curves = [];
        const points = this.sampleSearch();
        for (const point of points) {
            const curve = this.traceCurve(point);
            if (curve) {
                curves.push(curve);
            }
        }
        return curves;
    }
    sampleSearch() {
        const result = [];
        const steps = 40;
        for (let i = 0; i <= steps; i++) {
            for (let j = 0; j <= steps; j++) {
                const u = i /
                    steps;
                const v = j /
                    steps;
                const pointA = this.surfaceA.evaluate(u, v);
                const pointB = this.surfaceB.evaluate(u, v);
                if (pointA.distanceTo(pointB)
                    <
                        this.tolerance) {
                    result.push(pointA);
                }
            }
        }
        return result;
    }
    traceCurve(start) {
        const tangent = this.computeTangent(start);
        if (tangent.length()
            <
                this.tolerance) {
            return null;
        }
        const length = 1;
        const end = start.addVector(tangent.multiply(length));
        return new LineCurve(start, end);
    }
    computeTangent(point) {
        const normalA = this.surfaceA
            .normalAtPoint(point);
        const normalB = this.surfaceB
            .normalAtPoint(point);
        const tangent = normalA.cross(normalB);
        return tangent.normalize();
    }
}
//# sourceMappingURL=SurfaceIntersection.js.map