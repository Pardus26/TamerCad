import { Point } from "../../geometry/core/Point";
export var FaceClassification;
(function (FaceClassification) {
    FaceClassification["INSIDE"] = "inside";
    FaceClassification["OUTSIDE"] = "outside";
    FaceClassification["ON_BOUNDARY"] = "on_boundary";
})(FaceClassification || (FaceClassification = {}));
export class FaceClassifier {
    tolerance;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
    }
    classifyPoint(point, face) {
        const surface = face.surface;
        if (!surface) {
            return {
                classification: FaceClassification.OUTSIDE,
                distance: Infinity,
                point
            };
        }
        const closest = surface.closestPoint(point);
        const distance = closest.distanceTo(point);
        if (distance <=
            this.tolerance) {
            return {
                classification: FaceClassification.ON_BOUNDARY,
                distance,
                point: closest
            };
        }
        return {
            classification: FaceClassification.OUTSIDE,
            distance,
            point: closest
        };
    }
    classifyFaceAgainstSolid(face, solid) {
        const sample = this.getFaceSamplePoint(face);
        return this.classifyPointInSolid(sample, solid);
    }
    classifyPointInSolid(point, solid) {
        const boundary = this.isPointOnBoundary(point, solid);
        if (boundary) {
            return FaceClassification.ON_BOUNDARY;
        }
        const inside = this.rayCastInside(point, solid);
        return inside
            ?
                FaceClassification.INSIDE
            :
                FaceClassification.OUTSIDE;
    }
    isPointOnBoundary(point, solid) {
        for (const face of solid.getFaces()) {
            const result = this.classifyPoint(point, face);
            if (result.classification ===
                FaceClassification.ON_BOUNDARY) {
                return true;
            }
        }
        return false;
    }
    rayCastInside(point, solid) {
        /*


            Ray casting algorithm:



            Pointten +X yönünde

            sonsuz ray gönderilir.



            Kesişim sayısı:

            odd  -> inside

            even -> outside



            Gerçek kernel:

            Surface.intersectRay()

            burada çalışır.



        */
        let intersections = 0;
        for (const face of solid.getFaces()) {
            if (this.rayIntersectsFace(point, face)) {
                intersections++;
            }
        }
        return (intersections %
            2)
            ===
                1;
    }
    rayIntersectsFace(point, face) {
        if (!face.surface) {
            return false;
        }
        /*

            Placeholder.



            Plane:

            ray-plane intersection



            NURBS:

            ray-surface intersection



            burada uygulanacak.



        */
        return false;
    }
    getFaceSamplePoint(face) {
        const vertices = face.getEdges()
            .map(e => e.start.position);
        if (vertices.length === 0) {
            return new Point();
        }
        let x = 0;
        let y = 0;
        let z = 0;
        for (const p of vertices) {
            x += p.x;
            y += p.y;
            z += p.z;
        }
        return new Point(x / vertices.length, y / vertices.length, z / vertices.length);
    }
    classifyFacePair(faceA, faceB) {
        const point = this.getFaceSamplePoint(faceA);
        return this.classifyPoint(point, faceB)
            .classification;
    }
    isCoplanar(faceA, faceB) {
        if (!faceA.surface
            ||
                !faceB.surface) {
            return false;
        }
        const normalA = faceA.normalAt(0, 0);
        const normalB = faceB.normalAt(0, 0);
        if (!normalA
            ||
                !normalB) {
            return false;
        }
        const dot = normalA
            .dot(normalB);
        return Math.abs(Math.abs(dot)
            -
                1)
            <
                this.tolerance;
    }
}
//# sourceMappingURL=FaceClassifier.js.map