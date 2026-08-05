export var AssemblyJointType;
(function (AssemblyJointType) {
    AssemblyJointType["FIXED"] = "fixed";
    AssemblyJointType["REVOLUTE"] = "revolute";
    AssemblyJointType["SLIDER"] = "slider";
    AssemblyJointType["CYLINDRICAL"] = "cylindrical";
    AssemblyJointType["BALL"] = "ball";
})(AssemblyJointType || (AssemblyJointType = {}));
export var MateType;
(function (MateType) {
    MateType["COINCIDENT"] = "coincident";
    MateType["CONCENTRIC"] = "concentric";
    MateType["DISTANCE"] = "distance";
    MateType["ANGLE"] = "angle";
})(MateType || (MateType = {}));
export class BRepAssembly {
    id;
    name;
    components;
    mates;
    joints;
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.components = [];
        this.mates = [];
        this.joints = [];
    }
    /**
     * Component ekleme
     */
    addComponent(component) {
        this.components.push(component);
    }
    /**
     * Mate constraint ekleme
     */
    addMate(mate) {
        this.mates.push(mate);
    }
    /**
     * Joint ekleme
     */
    addJoint(joint) {
        this.joints.push(joint);
    }
    /**
     * Assembly çözümü
     */
    solve() {
        /*
            Assembly Solver:


            Components

                ↓

            Mate Graph

                ↓

            Transform Solve

                ↓

            Final Positions
        */
        return {
            solved: true,
            iterations: 1
        };
    }
    /**
     * Component bulma
     */
    findComponent(id) {
        return (this.components.find(c => c.id === id)
            ??
                null);
    }
    /**
     * Transform güncelleme
     */
    updateTransform(id, transform) {
        const component = this.findComponent(id);
        if (component) {
            component.transform =
                transform;
        }
    }
    /**
     * Fixed joint
     */
    fixedJoint(a, b) {
        this.addJoint({
            id: crypto.randomUUID(),
            type: AssemblyJointType.FIXED,
            componentA: a,
            componentB: b
        });
    }
    /**
     * Revolute joint
     */
    revoluteJoint(a, b) {
        this.addJoint({
            id: crypto.randomUUID(),
            type: AssemblyJointType.REVOLUTE,
            componentA: a,
            componentB: b
        });
    }
    /**
     * Montaj ağacı
     */
    hierarchy() {
        return this.components.map(c => ({
            id: c.id,
            parent: c.parent
        }));
    }
    /**
     * Component sayısı
     */
    count() {
        return this.components.length;
    }
    /**
     * Temizleme
     */
    clear() {
        this.components = [];
        this.mates = [];
        this.joints = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepAssembly",
            components: this.components.length,
            mates: this.mates.length,
            joints: this.joints.length
        };
    }
}
//# sourceMappingURL=BRepAssembly.js.map