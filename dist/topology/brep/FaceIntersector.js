import { IntersectionCurve } from "./IntersectionCurve";
export var FaceIntersectionType;
(function (FaceIntersectionType) {
    FaceIntersectionType["NONE"] = "none";
    FaceIntersectionType["POINT"] = "point";
    FaceIntersectionType["CURVE"] = "curve";
})(FaceIntersectionType || (FaceIntersectionType = {}));
export class FaceIntersector {
    tolerance;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
    }
    intersect(faceA, faceB) {
        const errors = [];
        const surfaceA = faceA.surface;
        const surfaceB = faceB.surface;
        if (!surfaceA
            ||
                !surfaceB) {
            return {
                type: FaceIntersectionType.NONE,
                curves: [],
                points: [],
                errors: [
                    "Missing surface geometry"
                ]
            };
        }
        const result = this.intersectSurfaces(surfaceA, surfaceB);
        if (result.curves.length > 0) {
            return {
                type: FaceIntersectionType.CURVE,
                curves: result.curves,
                points: result.points,
                errors
            };
        }
        if (result.points.length > 0) {
            return {
                type: FaceIntersectionType.POINT,
                curves: [],
                points: result.points,
                errors
            };
        }
        return {
            type: FaceIntersectionType.NONE,
            curves: [],
            points: [],
            errors
        };
    }
    intersectSurfaces(a, b) {
        const curves = [];
        const points = [];
        /*


            Gerçek CAD kernel:

            

            Solve:

            

            S1(u,v)=S2(s,t)



            burada:

            

            4 bilinmeyenli nonlinear

            sistem çözülür.



            Newton iteration:

            

            F(x)=0



            Jacobian:

            

            [Su Sv -Tu -Tv]



        */
        const samples = this.sampleSurfaceIntersection(a, b);
        if (samples.length > 1) {
            const curve = new IntersectionCurve(null, null);
            for (let i = 0; i < samples.length; i++) {
                curve.addSample(i /
                    (samples.length - 1), samples[i]);
            }
            curves.push(curve);
        }
        return {
            curves,
            points
        };
    }
    sampleSurfaceIntersection(a, b) {
        const result = [];
        const samples = 32;
        for (let i = 0; i <= samples; i++) {
            const u = a.uMin +
                (a.uMax -
                    a.uMin)
                    *
                        i
                    /
                        samples;
            for (let j = 0; j <= samples; j++) {
                const v = a.vMin +
                    (a.vMax -
                        a.vMin)
                        *
                            j
                        /
                            samples;
                const p = a.evaluate(u, v);
                const closest = b.closestPoint(p);
                if (p.distanceTo(closest)
                    <
                        this.tolerance) {
                    result.push(p);
                }
            }
        }
        return this.removeDuplicatePoints(result);
    }
    removeDuplicatePoints(points) {
        const result = [];
        for (const point of points) {
            const exists = result.some(p => p.distanceTo(point)
                <
                    this.tolerance);
            if (!exists) {
                result.push(point);
            }
        }
        return result;
    }
    intersectCurveWithFace(curve, face) {
        if (!face.surface) {
            return [];
        }
        const hits = [];
        const samples = 100;
        for (let i = 0; i <= samples; i++) {
            const t = i /
                samples;
            const point = curve.evaluate(t);
            const projected = face.surface
                .closestPoint(point);
            if (point.distanceTo(projected)
                <
                    this.tolerance) {
                hits.push(point);
            }
        }
        return hits;
    }
}
//# sourceMappingURL=FaceIntersector.js.map