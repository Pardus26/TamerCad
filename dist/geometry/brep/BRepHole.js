import { BRepSolid } from "./BRepSolid";
import { BRepBoolean } from "./BRepBoolean";
export var HoleType;
(function (HoleType) {
    HoleType["BLIND"] = "blind";
    HoleType["THROUGH"] = "through";
    HoleType["COUNTERBORE"] = "counterbore";
    HoleType["COUNTERSINK"] = "countersink";
})(HoleType || (HoleType = {}));
export var ThreadType;
(function (ThreadType) {
    ThreadType["NONE"] = "none";
    ThreadType["METRIC"] = "metric";
    ThreadType["UNIFIED"] = "unified";
})(ThreadType || (ThreadType = {}));
export class BRepHole {
    /**
     * Ana hole operasyonu
     */
    static create(base, position, options) {
        /*
            Pipeline:


            Hole Parameters


                  ↓


            Cylinder Cutter


                  ↓


            Optional Counter Profile


                  ↓


            Boolean Difference


                  ↓


            Heal


        */
        const cutter = this.createCutter(position, options);
        const result = BRepBoolean.subtract(base, cutter);
        return {
            success: result.success,
            solid: result.result,
            removedVolume: 0,
            warnings: []
        };
    }
    /**
     * Kesici silindir üretimi
     */
    static createCutter(position, options) {
        /*
            Cylinder:

            Radius = diameter / 2

            Height = depth

        */
        return new BRepSolid();
    }
    /**
     * Basit matkap deliği
     */
    static drill(base, position, diameter, depth) {
        return this.create(base, position, {
            diameter,
            depth,
            type: HoleType.BLIND,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            thread: ThreadType.NONE,
            threadPitch: 0
        });
    }
    /**
     * Through hole
     */
    static through(base, position, diameter) {
        return this.create(base, position, {
            diameter,
            depth: 100000,
            type: HoleType.THROUGH,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            thread: ThreadType.NONE,
            threadPitch: 0
        });
    }
    /**
     * Counterbore
     */
    static counterbore(base, position, holeDiameter, boreDiameter, depth) {
        return this.create(base, position, {
            diameter: boreDiameter,
            depth,
            type: HoleType.COUNTERBORE,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            thread: ThreadType.NONE,
            threadPitch: 0
        });
    }
    /**
     * Countersink
     */
    static countersink(base, position, diameter, angle) {
        return this.create(base, position, {
            diameter,
            depth: diameter,
            type: HoleType.COUNTERSINK,
            direction: {
                x: 0,
                y: 0,
                z: -1
            },
            thread: ThreadType.NONE,
            threadPitch: angle
        });
    }
    /**
     * Diş hazırlığı
     */
    static thread(options, type, pitch) {
        options.thread =
            type;
        options.threadPitch =
            pitch;
    }
    /**
     * Hole validation
     */
    static validate(options) {
        return (options.diameter > 0 &&
            options.depth > 0);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepHole",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepHole.js.map