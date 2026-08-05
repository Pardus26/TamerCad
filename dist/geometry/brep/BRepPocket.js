import { BRepSolid } from "./BRepSolid";
import { BRepBoolean } from "./BRepBoolean";
import { BRepExtrude } from "./BRepExtrude";
export var PocketType;
(function (PocketType) {
    PocketType["BLIND"] = "blind";
    PocketType["THROUGH_ALL"] = "through_all";
    PocketType["TWO_DIRECTION"] = "two_direction";
})(PocketType || (PocketType = {}));
export class BRepPocket {
    /**
     * Ana pocket operasyonu
     */
    static create(base, sketch, options) {
        /*
            Pipeline:


            Sketch


              ↓


            Extrude Cutter


              ↓


            Boolean Difference


              ↓


            Heal


              ↓


            New Solid


        */
        const cutter = this.createCutter(sketch, options);
        const result = BRepBoolean.subtract(base, cutter);
        return {
            success: result.success,
            solid: result.result,
            removedVolume: 0,
            warnings: []
        };
    }
    /**
     * Kesici solid üretimi
     */
    static createCutter(sketch, options) {
        const extrude = BRepExtrude.extrude(sketch, {
            direction: options.direction,
            depth: options.depth,
            symmetric: options.type ===
                PocketType.TWO_DIRECTION,
            taper: 0,
            tolerance: 1e-6
        });
        return (extrude.solid
            ??
                new BRepSolid());
    }
    /**
     * Blind pocket
     */
    static blind(base, sketch, depth) {
        return this.create(base, sketch, {
            depth,
            type: PocketType.BLIND,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            reverse: false
        });
    }
    /**
     * Through all pocket
     */
    static throughAll(base, sketch) {
        return this.create(base, sketch, {
            depth: 100000,
            type: PocketType.THROUGH_ALL,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            reverse: false
        });
    }
    /**
     * Two direction cut
     */
    static twoDirection(base, sketch, depth) {
        return this.create(base, sketch, {
            depth,
            type: PocketType.TWO_DIRECTION,
            direction: {
                x: 0,
                y: 0,
                z: 1
            },
            reverse: false
        });
    }
    /**
     * Pocket yön değiştirme
     */
    static reverseDirection(options) {
        options.reverse =
            !options.reverse;
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepPocket",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepPocket.js.map