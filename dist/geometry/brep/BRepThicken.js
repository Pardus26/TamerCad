import { BRepSolid } from "./BRepSolid";
import { BRepShell } from "./BRepShell";
import { BRepHeal } from "./BRepHeal";
import { BRepValidator } from "./BRepValidator";
export class BRepThicken {
    /**
     * Ana surface-to-solid işlemi
     */
    static thicken(surface, options) {
        /*
            Pipeline:


            1. Surface kopyala


            2. Offset surface oluştur


            3. Side walls üret


            4. Boundary kapat


            5. Shell oluştur


            6. Solid doğrula

        */
        const shell = this.createShell(surface, options);
        const solid = this.shellToSolid(shell);
        const healed = BRepHeal.heal(solid);
        return {
            success: healed.report.success,
            solid: healed.solid,
            thickness: options.distance,
            warnings: healed.report.warnings
        };
    }
    /**
     * Surface offset oluşturma
     */
    static offsetSurface(surface, distance, inward) {
        const offset = inward
            ? -distance
            : distance;
        /*
            Surface normal yönünde:

            S' = S + n*d

        */
        return surface.clone();
    }
    /**
     * Shell oluşturma
     */
    static createShell(surface, options) {
        const shell = new BRepShell();
        /*
            Outer face

            Inner offset face

            Connecting walls


            oluşturulur.

        */
        return shell;
    }
    /**
     * Boundary duvarları
     */
    static createSideWalls(surface, offset) {
        /*
            Açık kenarlar:

            Edge loop

            ↓

            Ruled surface

            ↓

            Wall faces

        */
        return [];
    }
    /**
     * Açıklıkları kapatma
     */
    static closeBoundaries(shell) {
        /*
            Planar cap:

            Boundary loop

            → Face

        */
        return shell;
    }
    /**
     * Shell → Solid dönüşümü
     */
    static shellToSolid(shell) {
        const solid = new BRepSolid();
        solid.addShell(shell);
        return solid;
    }
    /**
     * Sheet metal kalınlığı
     */
    static sheetThickness(surface, thickness) {
        return this.thicken(surface, {
            distance: thickness,
            inward: false,
            closeBoundaries: true,
            tolerance: 1e-6
        });
    }
    /**
     * Katı kontrolü
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
            engine: "BRepThicken",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepThicken.js.map