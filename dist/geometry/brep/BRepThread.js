import { BRepSolid } from "./BRepSolid";
import { BRepBoolean } from "./BRepBoolean";
export var ThreadStandard;
(function (ThreadStandard) {
    ThreadStandard["METRIC_ISO"] = "metric_iso";
    ThreadStandard["UNIFIED"] = "unified";
    ThreadStandard["ACME"] = "acme";
    ThreadStandard["CUSTOM"] = "custom";
})(ThreadStandard || (ThreadStandard = {}));
export var ThreadDirection;
(function (ThreadDirection) {
    ThreadDirection["RIGHT"] = "right";
    ThreadDirection["LEFT"] = "left";
})(ThreadDirection || (ThreadDirection = {}));
export var ThreadMode;
(function (ThreadMode) {
    ThreadMode["INTERNAL"] = "internal";
    ThreadMode["EXTERNAL"] = "external";
})(ThreadMode || (ThreadMode = {}));
export class BRepThread {
    /**
     * Ana thread oluşturma
     */
    static create(base, position, options) {
        /*
            Pipeline:


            Thread Parameters


                 ↓


            Helix Curve


                 ↓


            Thread Profile


                 ↓


            Sweep


                 ↓


            Boolean Union/Subtract


                 ↓


            Final Solid

        */
        const helix = this.generateHelix(position, options);
        const profile = this.generateProfile(options);
        const threadSolid = this.sweepThread(helix, profile);
        let result;
        if (options.mode ===
            ThreadMode.INTERNAL) {
            result =
                BRepBoolean.subtract(base, threadSolid);
        }
        else {
            result =
                BRepBoolean.union(base, threadSolid);
        }
        return {
            success: result.success,
            solid: result.result,
            turns: options.length /
                options.pitch,
            warnings: []
        };
    }
    /**
     * Helix üretimi
     */
    static generateHelix(center, options) {
        const points = [];
        const turns = options.length /
            options.pitch;
        const segments = Math.floor(turns * 100);
        for (let i = 0; i <= segments; i++) {
            const t = i /
                segments;
            const angle = t *
                turns *
                Math.PI *
                2;
            points.push({
                x: center.x +
                    Math.cos(angle)
                        *
                            options.diameter
                        /
                            2,
                y: center.y +
                    Math.sin(angle)
                        *
                            options.diameter
                        /
                            2,
                z: center.z +
                    t *
                        options.length
            });
        }
        return points;
    }
    /**
     * Thread profili
     */
    static generateProfile(options) {
        return {
            type: options.standard,
            angle: options.angle,
            pitch: options.pitch
        };
    }
    /**
     * Helix sweep
     */
    static sweepThread(helix, profile) {
        /*
            Sweep algorithm:


            Profile

              +

            Helix Path


              ↓


            Thread Body

        */
        return new BRepSolid();
    }
    /**
     * ISO Metric thread
     */
    static metric(base, position, diameter, pitch, length) {
        return this.create(base, position, {
            diameter,
            pitch,
            length,
            standard: ThreadStandard.METRIC_ISO,
            direction: ThreadDirection.RIGHT,
            mode: ThreadMode.INTERNAL,
            angle: 60
        });
    }
    /**
     * External thread
     */
    static external(base, position, options) {
        options.mode =
            ThreadMode.EXTERNAL;
        return this.create(base, position, options);
    }
    /**
     * Internal thread
     */
    static internal(base, position, options) {
        options.mode =
            ThreadMode.INTERNAL;
        return this.create(base, position, options);
    }
    /**
     * Sol helix
     */
    static leftHand(options) {
        options.direction =
            ThreadDirection.LEFT;
    }
    /**
     * Validation
     */
    static validate(options) {
        return (options.diameter > 0 &&
            options.pitch > 0 &&
            options.length > 0);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepThread",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepThread.js.map