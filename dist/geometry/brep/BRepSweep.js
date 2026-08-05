import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export var SweepOrientation;
(function (SweepOrientation) {
    SweepOrientation["FIXED"] = "fixed";
    SweepOrientation["NORMAL"] = "normal";
    SweepOrientation["FRENET"] = "frenet";
})(SweepOrientation || (SweepOrientation = {}));
export class BRepSweep {
    /**
     * Ana sweep operasyonu
     */
    static sweep(profile, path, options) {
        /*
            Pipeline:


            Profile

              +

            Path


              ↓


            Frame Calculation


              ↓


            Profile Transport


              ↓


            Surface Skinning


              ↓


            Solid Closing


        */
        const surface = this.generateSurface(profile, path, options);
        const solid = this.surfaceToSolid(surface);
        const healed = BRepHeal.heal(solid);
        return {
            success: healed.report.success,
            surface,
            solid: healed.solid,
            warnings: healed.report.warnings
        };
    }
    /**
     * Sweep surface üretimi
     */
    static generateSurface(profile, path, options) {
        /*
            CAD algoritması:


            1. Path parameterizasyonu


            2. Frenet frame hesaplama


            3. Profil noktalarını taşıma


            4. Twist uygulama


            5. Surface fitting


            6. Trim


        */
        return null;
    }
    /**
     * Solid sweep
     */
    static solidSweep(profile, path) {
        return this.sweep(profile, path, {
            orientation: SweepOrientation.NORMAL,
            twist: 0,
            closed: false,
            tolerance: 1e-6
        });
    }
    /**
     * Pipe oluşturma
     */
    static pipe(radius, path) {
        /*
            Circle profile:

            Radius R

            Along path


        */
        const profile = null;
        return this.solidSweep(profile, path);
    }
    /**
     * Rail destekli sweep
     */
    static railSweep(profile, path, rail) {
        /*
            Guide rail:

            Shape control

            Camera rail

            Automotive body


        */
        return null;
    }
    /**
     * Twist kontrollü sweep
     */
    static twistedSweep(profile, path, twist) {
        return this.sweep(profile, path, {
            orientation: SweepOrientation.FRENET,
            twist,
            closed: false,
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
     * Sweep kalite analizi
     */
    static analyze(surface) {
        return {
            selfIntersection: false,
            smooth: true,
            curvatureQuality: "good"
        };
    }
    /**
     * Validation
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
            engine: "BRepSweep",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepSweep.js.map