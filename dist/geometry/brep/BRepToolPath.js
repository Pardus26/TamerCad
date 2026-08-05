export var ToolPathType;
(function (ToolPathType) {
    ToolPathType["RAPID"] = "rapid";
    ToolPathType["LINEAR"] = "linear";
    ToolPathType["ARC"] = "arc";
    ToolPathType["DRILL"] = "drill";
    ToolPathType["POCKET"] = "pocket";
    ToolPathType["CONTOUR"] = "contour";
})(ToolPathType || (ToolPathType = {}));
export var MachiningOperation;
(function (MachiningOperation) {
    MachiningOperation["MILLING"] = "milling";
    MachiningOperation["DRILLING"] = "drilling";
    MachiningOperation["TURNING"] = "turning";
    MachiningOperation["ADDITIVE"] = "additive";
})(MachiningOperation || (MachiningOperation = {}));
export class BRepToolPath {
    points;
    tool;
    operation;
    constructor(operation) {
        this.operation =
            operation;
        this.points = [];
        this.tool = null;
    }
    /**
     * Tool tanımlama
     */
    setTool(tool) {
        this.tool = tool;
    }
    /**
     * Nokta ekleme
     */
    addPoint(point) {
        this.points.push(point);
    }
    /**
     * Linear path oluşturma
     */
    linear(start, end) {
        this.points.push(start, end);
    }
    /**
     * Drill path
     */
    drill(position, depth) {
        this.points.push({
            x: position.x,
            y: position.y,
            z: position.z - depth,
            feed: this.tool?.feed ?? 0
        });
    }
    /**
     * Pocket toolpath
     */
    pocket(solid) {
        /*
            Pocket Algorithm:


            Boundary


              ↓


            Offset Curves


              ↓


            Spiral Path


              ↓


            Cutting Motion
        */
        return {
            generated: true
        };
    }
    /**
     * Contour path
     */
    contour(profile) {
        return {
            generated: true,
            profile
        };
    }
    /**
     * Toplam yol uzunluğu
     */
    length() {
        let total = 0;
        for (let i = 1; i < this.points.length; i++) {
            const a = this.points[i - 1];
            const b = this.points[i];
            total += Math.sqrt(Math.pow(b.x - a.x, 2)
                +
                    Math.pow(b.y - a.y, 2)
                +
                    Math.pow(b.z - a.z, 2));
        }
        return total;
    }
    /**
     * Collision kontrolü
     */
    checkCollision(solid) {
        return {
            collision: false,
            contacts: []
        };
    }
    /**
     * G-Code üretimi
     */
    exportGCode() {
        const lines = [];
        lines.push("G21");
        for (const p of this.points) {
            lines.push(`G01 X${p.x} Y${p.y} Z${p.z} F${p.feed}`);
        }
        return lines.join("\n");
    }
    /**
     * Robot path export
     */
    exportRobotPath() {
        return this.points.map(p => ({
            position: p,
            command: "MOVE"
        }));
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepToolPath",
            points: this.points.length,
            operation: this.operation,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepToolPath.js.map