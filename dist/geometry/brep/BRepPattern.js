import { BRepTransform } from "./BRepTransform";
import { BRepValidator } from "./BRepValidator";
export var PatternType;
(function (PatternType) {
    PatternType["LINEAR"] = "linear";
    PatternType["CIRCULAR"] = "circular";
    PatternType["MIRROR"] = "mirror";
})(PatternType || (PatternType = {}));
export class BRepPattern {
    /**
     * Ana pattern operasyonu
     */
    static apply(solid, options) {
        switch (options.type) {
            case PatternType.LINEAR:
                return this.linear(solid, options);
            case PatternType.CIRCULAR:
                return this.circular(solid, options);
            case PatternType.MIRROR:
                return this.mirror(solid, options);
        }
    }
    /**
     * Linear pattern
     *
     * Örnek:
     *
     * Vida delikleri sıralama
     */
    static linear(solid, options) {
        const result = [];
        for (let i = 0; i < options.count; i++) {
            const copy = solid.clone();
            const offset = {
                x: (options.direction?.x ?? 1)
                    *
                        options.spacing
                    *
                        i,
                y: (options.direction?.y ?? 0)
                    *
                        options.spacing
                    *
                        i,
                z: (options.direction?.z ?? 0)
                    *
                        options.spacing
                    *
                        i
            };
            BRepTransform.translate(copy, offset);
            result.push(copy);
        }
        return {
            success: true,
            solids: result,
            instances: result.length,
            warnings: []
        };
    }
    /**
     * Circular pattern
     *
     * Örnek:
     *
     * Flanş delikleri
     */
    static circular(solid, options) {
        const result = [];
        const angleStep = (options.angle ?? Math.PI * 2)
            /
                options.count;
        for (let i = 0; i < options.count; i++) {
            const copy = solid.clone();
            /*
                Rotation:

                θ = i * angleStep

            */
            BRepTransform.rotate(copy, {
                x: 0,
                y: 0,
                z: i * angleStep
            });
            result.push(copy);
        }
        return {
            success: true,
            solids: result,
            instances: result.length,
            warnings: []
        };
    }
    /**
     * Mirror pattern
     */
    static mirror(solid, options) {
        const copy = solid.clone();
        /*
            Mirror plane:

            XY

            XZ

            YZ


        */
        return {
            success: true,
            solids: [
                solid,
                copy
            ],
            instances: 2,
            warnings: []
        };
    }
    /**
     * Feature çoğaltma
     */
    static duplicate(solid, count) {
        return this.linear(solid, {
            type: PatternType.LINEAR,
            count,
            spacing: 0,
            tolerance: 1e-6
        });
    }
    /**
     * Pattern geçerlilik kontrolü
     */
    static validate(solids) {
        for (const solid of solids) {
            if (!BRepValidator
                .validateSolid(solid)
                .valid) {
                return false;
            }
        }
        return true;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepPattern",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepPattern.js.map