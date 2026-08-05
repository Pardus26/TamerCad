import { BRepToolPath } from "./BRepToolPath";
export var MachineType;
(function (MachineType) {
    MachineType["CNC_3_AXIS"] = "3_axis";
    MachineType["CNC_5_AXIS"] = "5_axis";
    MachineType["LATHE"] = "lathe";
    MachineType["ROBOT_CELL"] = "robot_cell";
})(MachineType || (MachineType = {}));
export var CAMOperation;
(function (CAMOperation) {
    CAMOperation["FACE_MILL"] = "face_mill";
    CAMOperation["POCKET"] = "pocket";
    CAMOperation["CONTOUR"] = "contour";
    CAMOperation["DRILL"] = "drill";
    CAMOperation["THREAD"] = "thread";
})(CAMOperation || (CAMOperation = {}));
export class BRepCAM {
    setup;
    tools;
    operations;
    part;
    constructor() {
        this.setup = {
            machine: MachineType.CNC_3_AXIS,
            origin: {
                x: 0,
                y: 0,
                z: 0
            },
            tolerance: 0.01
        };
        this.tools = [];
        this.operations = [];
        this.part = null;
    }
    /**
     * Manufacturing setup
     */
    configure(setup) {
        this.setup =
            setup;
    }
    /**
     * Parça yükleme
     */
    loadPart(solid) {
        this.part =
            solid;
    }
    /**
     * Tool ekleme
     */
    addTool(tool) {
        this.tools.push(tool);
    }
    /**
     * Face milling
     */
    faceMill(depth) {
        const path = new BRepToolPath(CAMOperation.FACE_MILL);
        this.operations.push({
            operation: CAMOperation.FACE_MILL,
            toolpath: path,
            estimatedTime: depth * 2
        });
    }
    /**
     * Pocket operasyonu
     */
    pocket(depth) {
        const path = new BRepToolPath(CAMOperation.POCKET);
        this.operations.push({
            operation: CAMOperation.POCKET,
            toolpath: path,
            estimatedTime: depth * 5
        });
    }
    /**
     * Drill operasyonu
     */
    drill(positions) {
        const path = new BRepToolPath(CAMOperation.DRILL);
        for (const p of positions) {
            path.drill(p, 20);
        }
        this.operations.push({
            operation: CAMOperation.DRILL,
            toolpath: path,
            estimatedTime: positions.length
        });
    }
    /**
     * Contour machining
     */
    contour() {
        return {
            generated: true
        };
    }
    /**
     * Toolpath oluşturma
     */
    generateToolPaths() {
        return this.operations.map(op => op.toolpath);
    }
    /**
     * Süre tahmini
     */
    estimateTime() {
        return this.operations.reduce((sum, op) => sum +
            op.estimatedTime, 0);
    }
    /**
     * Post processor
     */
    postProcess() {
        let output = "";
        for (const op of this.operations) {
            output +=
                op.toolpath.exportGCode()
                    +
                        "\n";
        }
        return output;
    }
    /**
     * CAM çalıştır
     */
    build() {
        const gcode = this.postProcess();
        return {
            success: true,
            operations: this.operations.length,
            gcode,
            warnings: []
        };
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepCAM",
            operations: this.operations.length,
            tools: this.tools.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepCAM.js.map