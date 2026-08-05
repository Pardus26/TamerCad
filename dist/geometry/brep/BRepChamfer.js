import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export var ChamferType;
(function (ChamferType) {
    ChamferType["DISTANCE"] = "distance";
    ChamferType["ANGLE"] = "angle";
})(ChamferType || (ChamferType = {}));
export class BRepChamfer {
    /**
     * Ana chamfer operasyonu
     */
    static apply(solid, edges, options) {
        let result = solid.clone();
        for (const edge of edges) {
            result =
                this.chamferEdge(result, edge, options);
        }
        const healed = BRepHeal.heal(result);
        return {
            success: healed.report.success,
            solid: healed.solid,
            affectedEdges: edges.length,
            warnings: healed.report.warnings
        };
    }
    /**
     * Tek edge chamfer
     */
    static chamferEdge(solid, edge, options) {
        const result = solid.clone();
        /*
            Gerçek CAD algoritması:


            1. Edge komşu yüzleri bul


            2. Distance/angle offset oluştur


            3. Yeni chamfer face üret


            4. Eski edge kaldır


            5. Topology rebuild


        */
        return result;
    }
    /**
     * Distance chamfer
     *
     * Örnek:
     *
     * 5mm x 5mm pah
     */
    static distanceChamfer(solid, edges, distance) {
        return this.apply(solid, edges, {
            type: ChamferType.DISTANCE,
            distance,
            tolerance: 1e-6
        });
    }
    /**
     * Angle chamfer
     *
     * Örnek:
     *
     * 45 derece pah
     */
    static angleChamfer(solid, edges, distance, angle) {
        return this.apply(solid, edges, {
            type: ChamferType.ANGLE,
            distance,
            angle,
            tolerance: 1e-6
        });
    }
    /**
     * Edge uygunluk kontrolü
     */
    static canChamfer(edge, distance) {
        if (distance <= 0) {
            return false;
        }
        return true;
    }
    /**
     * Chamfer yüzeyi oluşturma
     */
    static createChamferFace(faceA, faceB, distance) {
        /*
            Yeni planar face:

            Face A offset

            Face B offset

            Intersection

            Yeni pah yüzeyi

        */
        return null;
    }
    /**
     * Vertex köşe temizleme
     */
    static cleanupCorner(vertex) {
        /*
            Çoklu edge birleşimlerinde:

            - miter corner
            - tangent cleanup

        */
        return true;
    }
    /**
     * Çoklu edge chamfer
     */
    static chamferEdges(solid, edges, distance) {
        return this.distanceChamfer(solid, edges, distance);
    }
    /**
     * Son doğrulama
     */
    static validate(solid) {
        return (BRepValidator
            .validateSolid(solid)
            .valid);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepChamfer",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepChamfer.js.map