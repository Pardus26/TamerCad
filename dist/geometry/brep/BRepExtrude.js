import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export class BRepExtrude {
    /**
     * Ana extrude operasyonu
     */
    static extrude(sketch, options) {
        /*
            Pipeline:


            Sketch


              ↓


            Profile Extraction


              ↓


            Surface Creation


              ↓


            Side Faces


              ↓


            Solid Closing


              ↓


            Heal


        */
        const profile = sketch.generateProfile();
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
     * Extrude surface üretimi
     */
    static generateSurface(profile, options) {
        /*
            CAD algoritması:


            Profile Curve


                +


            Translation Vector


                ↓


            Top Face


            Bottom Face


            Side Faces


                ↓


            Surface Shell


        */
        return null;
    }
    /**
     * Symmetric extrude
     */
    static symmetricExtrude(sketch, depth) {
        return this.extrude(sketch, {
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            depth,
            symmetric: true,
            taper: 0,
            tolerance: 1e-6
        });
    }
    /**
     * Normal extrude
     */
    static normalExtrude(sketch, depth) {
        return this.extrude(sketch, {
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            depth,
            symmetric: false,
            taper: 0,
            tolerance: 1e-6
        });
    }
    /**
     * Tapered extrude
     */
    static taperedExtrude(sketch, depth, angle) {
        return this.extrude(sketch, {
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            depth,
            symmetric: false,
            taper: angle,
            tolerance: 1e-6
        });
    }
    /**
     * Thin feature
     */
    static thinExtrude(sketch, thickness) {
        return this.extrude(sketch, {
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            depth: thickness,
            symmetric: true,
            taper: 0,
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
     * Extrude yön doğrulama
     */
    static validateDirection(direction) {
        return (direction.x !== 0 ||
            direction.y !== 0 ||
            direction.z !== 0);
    }
    /**
     * Solid kontrol
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
            engine: "BRepExtrude",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepExtrude.js.map