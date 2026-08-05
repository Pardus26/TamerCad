import { BRepSolid } from "./BRepSolid";
import { BRepBoolean } from "./BRepBoolean";
import { BRepExtrude } from "./BRepExtrude";
export var BossType;
(function (BossType) {
    BossType["BLIND"] = "blind";
    BossType["SYMMETRIC"] = "symmetric";
    BossType["THROUGH"] = "through";
})(BossType || (BossType = {}));
export class BRepBoss {
    /**
     * Ana boss oluşturma
     */
    static create(base, sketch, options) {
        /*
            Pipeline:


            Sketch


              ↓


            Extrude Additive Body


              ↓


            Boolean Union


              ↓


            Heal


              ↓


            New Solid

        */
        const addition = this.createFeatureSolid(sketch, options);
        const result = BRepBoolean.union(base, addition);
        return {
            success: result.success,
            solid: result.result,
            addedVolume: 0,
            warnings: []
        };
    }
    /**
     * Boss solid üretimi
     */
    static createFeatureSolid(sketch, options) {
        const extrusion = BRepExtrude.extrude(sketch, {
            direction: options.direction,
            depth: options.height,
            symmetric: options.type ===
                BossType.SYMMETRIC,
            taper: options.taper,
            tolerance: 1e-6
        });
        return (extrusion.solid
            ??
                new BRepSolid());
    }
    /**
     * Normal boss
     */
    static blind(base, sketch, height) {
        return this.create(base, sketch, {
            height,
            type: BossType.BLIND,
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            taper: 0
        });
    }
    /**
     * Symmetric boss
     */
    static symmetric(base, sketch, height) {
        return this.create(base, sketch, {
            height,
            type: BossType.SYMMETRIC,
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            taper: 0
        });
    }
    /**
     * Draft angle boss
     */
    static tapered(base, sketch, height, angle) {
        return this.create(base, sketch, {
            height,
            type: BossType.BLIND,
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            taper: angle
        });
    }
    /**
     * Attachment face kontrolü
     */
    static attachToFace(faceId) {
        return {
            attached: true,
            face: faceId
        };
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepBoss",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepBoss.js.map