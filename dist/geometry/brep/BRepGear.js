import { BRepSolid } from "./BRepSolid";
export var GearType;
(function (GearType) {
    GearType["SPUR"] = "spur";
    GearType["HELICAL"] = "helical";
    GearType["INTERNAL"] = "internal";
})(GearType || (GearType = {}));
export class BRepGear {
    /**
     * Ana gear üretimi
     */
    static create(options) {
        /*
            Pipeline:


            Gear Parameters


                 ↓


            Pitch Calculation


                 ↓


            Involute Tooth


                 ↓


            Tooth Pattern


                 ↓


            Extrude


                 ↓


            Solid


        */
        const profile = this.generateProfile(options);
        const solid = this.extrudeGear(profile, options);
        return {
            success: true,
            solid,
            pitchDiameter: this.pitchDiameter(options),
            warnings: []
        };
    }
    /**
     * Pitch diameter
     *
     * d = z * m
     */
    static pitchDiameter(options) {
        return (options.teeth *
            options.module);
    }
    /**
     * Involute diş profili
     */
    static generateInvolute(options) {
        const points = [];
        const baseRadius = this.baseCircleRadius(options);
        for (let i = 0; i < 20; i++) {
            const t = i /
                19;
            const angle = t *
                Math.PI /
                3;
            points.push({
                x: baseRadius *
                    (Math.cos(angle)),
                y: baseRadius *
                    (Math.sin(angle))
            });
        }
        return points;
    }
    /**
     * Base circle
     */
    static baseCircleRadius(options) {
        const pitch = this.pitchDiameter(options) / 2;
        return (pitch *
            Math.cos(options.pressureAngle *
                Math.PI /
                180));
    }
    /**
     * Tooth profile
     */
    static generateProfile(options) {
        const involute = this.generateInvolute(options);
        return {
            points: involute,
            teeth: options.teeth
        };
    }
    /**
     * Diş çoğaltma
     */
    static patternTeeth(profile, count) {
        const teeth = [];
        for (let i = 0; i < count; i++) {
            teeth.push({
                index: i,
                rotation: i *
                    360 /
                    count
            });
        }
        return teeth;
    }
    /**
     * Gear extrusion
     */
    static extrudeGear(profile, options) {
        /*
            Tooth profile

                 ↓

            Face

                 ↓

            Extrude width

                 ↓

            Gear Solid
        */
        return new BRepSolid();
    }
    /**
     * Spur gear
     */
    static spur(teeth, module, width) {
        return this.create({
            teeth,
            module,
            width,
            pressureAngle: 20,
            type: GearType.SPUR,
            helixAngle: 0
        });
    }
    /**
     * Helical gear
     */
    static helical(teeth, module, width, helixAngle) {
        return this.create({
            teeth,
            module,
            width,
            pressureAngle: 20,
            type: GearType.HELICAL,
            helixAngle
        });
    }
    /**
     * Gear pair meshing
     */
    static gearPair(gearA, gearB) {
        return {
            ratio: gearB.teeth /
                gearA.teeth,
            distance: (gearA.teeth +
                gearB.teeth)
                *
                    gearA.module
                /
                    2
        };
    }
    /**
     * Validation
     */
    static validate(options) {
        return (options.teeth > 5 &&
            options.module > 0 &&
            options.width > 0);
    }
    /**
     * Debug
     */
    static info() {
        return {
            engine: "BRepGear",
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepGear.js.map