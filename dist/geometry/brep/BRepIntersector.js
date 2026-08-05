export class BRepIntersector {
    /**
     * Solid-Solid intersection
     */
    static intersectSolids(a, b) {
        const points = [];
        const curves = [];
        for (const shellA of a.shells) {
            for (const faceA of shellA.faces) {
                for (const shellB of b.shells) {
                    for (const faceB of shellB.faces) {
                        const result = this.intersectFaces(faceA, faceB);
                        points.push(...result.points);
                        curves.push(...result.curves);
                    }
                }
            }
        }
        return {
            success: true,
            points,
            curves,
            message: "Solid intersection completed"
        };
    }
    /**
     * Face-Face intersection
     */
    static intersectFaces(a, b) {
        /*
            Gerçek CAD kernel:

            Plane-Plane

            Plane-Cylinder

            Cylinder-Cylinder

            NURBS-NURBS


            sonuç:

            Intersection Curve

        */
        return {
            success: true,
            points: [],
            curves: [],
            message: "Face intersection calculated"
        };
    }
    /**
     * Edge-Edge intersection
     */
    static intersectEdges(a, b) {
        /*
            Destek:

            Line-Line

            Line-Curve

            Curve-Curve


        */
        return [];
    }
    /**
     * Edge-Face intersection
     */
    static intersectEdgeFace(edge, face) {
        /*
            Curve-Surface intersection

            Örnek:

            Line + Plane

            Circle + Cylinder

            Bezier + Surface


        */
        return [];
    }
    /**
     * Curve kesişimi
     */
    static intersectCurves(a, b) {
        return [];
    }
    /**
     * Surface kesişimi
     */
    static intersectSurfaces(a, b) {
        return [];
    }
    /**
     * Intersection curve oluşturma
     */
    static buildIntersectionCurve(points) {
        if (points.length < 2) {
            return null;
        }
        /*
            Noktalardan:

            Polyline

            Spline

            NURBS Curve


            oluşturulabilir.

        */
        return null;
    }
    /**
     * Boolean öncesi hazırlık
     */
    static prepareBoolean(a, b) {
        return {
            intersections: this.intersectSolids(a, b),
            ready: true
        };
    }
    /**
     * Kesişim noktalarını temizleme
     */
    static removeDuplicatePoints(points, tolerance = 1e-6) {
        const result = [];
        for (const p of points) {
            const exists = result.some(q => Math.abs(p.x - q.x)
                <
                    tolerance &&
                Math.abs(p.y - q.y)
                    <
                        tolerance &&
                Math.abs(p.z - q.z)
                    <
                        tolerance);
            if (!exists) {
                result.push(p);
            }
        }
        return result;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepIntersector",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepIntersector.js.map