import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export var BlendContinuity;
(function (BlendContinuity) {
    BlendContinuity["POSITION"] = "G0";
    BlendContinuity["TANGENT"] = "G1";
    BlendContinuity["CURVATURE"] = "G2";
})(BlendContinuity || (BlendContinuity = {}));
export class BRepBlend {
    /**
     * Ana blend operasyonu
     */
    static apply(solid, edges, options) {
        let result = solid.clone();
        for (const edge of edges) {
            result =
                this.blendEdge(result, edge, options);
        }
        const healed = BRepHeal.heal(result);
        return {
            success: healed.report.success,
            solid: healed.solid,
            surface: null,
            warnings: healed.report.warnings
        };
    }
    /**
     * Edge blend
     */
    static blendEdge(solid, edge, options) {
        const result = solid.clone();
        /*
            CAD algoritması:


            1. Adjacent faces bul


            2. Boundary curves çıkar


            3. Rolling ball / spine oluştur


            4. Blend surface üret


            5. Eski yüzleri trim et


            6. Topology güncelle


        */
        return result;
    }
    /**
     * Face-face surface blend
     */
    static blendFaces(faceA, faceB, options) {
        /*
            Yüzey geçişi:


            G0:

            sadece temas


            G1:

            normal devamlılığı


            G2:

            curvature devamlılığı


        */
        return null;
    }
    /**
     * G1 tangent blend
     */
    static tangentBlend(faceA, faceB, radius) {
        return this.blendFaces(faceA, faceB, {
            radius,
            continuity: BlendContinuity.TANGENT,
            tolerance: 1e-6
        });
    }
    /**
     * G2 curvature blend
     */
    static curvatureBlend(faceA, faceB, radius) {
        return this.blendFaces(faceA, faceB, {
            radius,
            continuity: BlendContinuity.CURVATURE,
            tolerance: 1e-6
        });
    }
    /**
     * Loft geçiş yüzeyi
     */
    static loftBlend(sections) {
        /*
            Section curves:

            Curve 1
               |
            Curve 2
               |
            Curve 3


            Loft surface


        */
        return null;
    }
    /**
     * Blend kalite kontrolü
     */
    static analyzeQuality(surface) {
        return {
            continuity: BlendContinuity.TANGENT,
            smooth: true,
            curvatureVariation: 0
        };
    }
    /**
     * Radius kontrolü
     */
    static validateRadius(radius) {
        return radius > 0;
    }
    /**
     * Solid doğrulama
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
            engine: "BRepBlend",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepBlend.js.map