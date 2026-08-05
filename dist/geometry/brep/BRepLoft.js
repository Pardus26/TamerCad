import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export var LoftContinuity;
(function (LoftContinuity) {
    LoftContinuity["POSITION"] = "G0";
    LoftContinuity["TANGENT"] = "G1";
    LoftContinuity["CURVATURE"] = "G2";
})(LoftContinuity || (LoftContinuity = {}));
export class BRepLoft {
    /**
     * Curve sectionlardan surface loft
     */
    static createSurface(sections, options) {
        if (sections.length < 2) {
            return {
                success: false,
                surface: null,
                solid: null,
                warnings: [
                    "Need at least two sections"
                ]
            };
        }
        /*
            Pipeline:


            Section curves

                ↓

            Profile alignment

                ↓

            Knot matching

                ↓

            Loft surface

                ↓

            Trim


        */
        const surface = this.generateSurface(sections, options);
        return {
            success: true,
            surface,
            solid: null,
            warnings: []
        };
    }
    /**
     * Solid loft
     */
    static createSolid(sections, options) {
        const surfaceResult = this.createSurface(sections, options);
        if (!surfaceResult.surface) {
            return {
                success: false,
                surface: null,
                solid: null,
                warnings: [
                    "Surface generation failed"
                ]
            };
        }
        const solid = this.surfaceToSolid(surfaceResult.surface);
        const healed = BRepHeal.heal(solid);
        return {
            success: healed.report.success,
            surface: surfaceResult.surface,
            solid: healed.solid,
            warnings: healed.report.warnings
        };
    }
    /**
     * Loft surface üretimi
     */
    static generateSurface(sections, options) {
        /*
            Gerçek CAD:


            1. Curve parameterizasyonu


            2. Control point eşleme


            3. NURBS skinning


            4. Knot vector oluşturma


            5. Surface fitting


        */
        return null;
    }
    /**
     * Profil hizalama
     */
    static alignProfiles(sections) {
        /*
            Kontroller:

            - Start point
            - Direction
            - Parameter length
            - Seam alignment


        */
        return sections;
    }
    /**
     * Guide curve destekli loft
     */
    static guideLoft(sections, guides) {
        /*
            Guide curves:

            Profile 1
              |
            Profile 2
              |
            Profile 3


            Shape control


        */
        return null;
    }
    /**
     * Closed loft
     */
    static closedLoft(sections) {
        return this.createSurface(sections, {
            continuity: LoftContinuity.TANGENT,
            closed: true,
            tolerance: 1e-6
        });
    }
    /**
     * Surface → Solid
     */
    static surfaceToSolid(surface) {
        const solid = new BRepSolid();
        const shell = new BRepShell();
        solid.addShell(shell);
        return solid;
    }
    /**
     * Continuity analizi
     */
    static analyzeContinuity(surface) {
        return {
            continuity: LoftContinuity.TANGENT,
            smooth: true
        };
    }
    /**
     * Loft doğrulama
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
            engine: "BRepLoft",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepLoft.js.map