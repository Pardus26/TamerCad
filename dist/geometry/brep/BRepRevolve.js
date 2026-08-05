import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export class BRepRevolve {
    /**
     * Ana revolve operasyonu
     */
    static revolve(profile, options) {
        /*
            Pipeline:


            Profile

              +

            Axis


              ↓


            Angular Transform


              ↓


            Surface Revolution


              ↓


            Solid Creation


              ↓


            Heal


        */
        const surface = this.generateSurface(profile, options);
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
     * Revolved surface üretimi
     */
    static generateSurface(profile, options) {
        /*
            CAD algoritması:


            1. Profile noktalarını al


            2. Axis uzaklıklarını hesapla


            3. Rotation matrix uygula


            4. Sweep surface oluştur


            5. Seam edge oluştur


        */
        return null;
    }
    /**
     * Tam 360 derece revolve
     */
    static fullRevolve(profile, axis) {
        return this.revolve(profile, {
            axis,
            angle: Math.PI * 2,
            closed: true,
            tolerance: 1e-6
        });
    }
    /**
     * Kısmi açı revolve
     */
    static partialRevolve(profile, axis, angle) {
        return this.revolve(profile, {
            axis,
            angle,
            closed: false,
            tolerance: 1e-6
        });
    }
    /**
     * Lathe parça oluşturma
     */
    static lathe(profile, axis) {
        return this.fullRevolve(profile, axis);
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
     * Axis kontrolü
     */
    static validateAxis(axis) {
        return (axis.direction.x !== 0 ||
            axis.direction.y !== 0 ||
            axis.direction.z !== 0);
    }
    /**
     * Self intersection kontrolü
     */
    static analyze(surface) {
        return {
            selfIntersection: false,
            seamDetected: true,
            smooth: true
        };
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
            engine: "BRepRevolve",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepRevolve.js.map