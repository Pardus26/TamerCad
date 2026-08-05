export class BRepManufacturing {
    process;
    machine;
    issues;
    options;
    constructor() {
        this.process = "CNC";
        this.machine = {
            axes: 3,
            maxSize: 500,
            tolerance: 0.01
        };
        this.issues = [];
        this.options = {
            process: "CNC",
            tolerance: 0.05
        };
    }
    /**
     * Üretim prosesi seçimi
     */
    setProcess(process) {
        this.process =
            process;
        this.options.process =
            process;
    }
    /**
     * Makine tanımlama
     */
    setMachine(capability) {
        this.machine =
            capability;
    }
    /**
     * Ana üretilebilirlik analizi
     */
    analyze() {
        this.issues = [];
        this.checkGeometry();
        this.checkAccess();
        this.checkTolerance();
        return {
            success: true,
            feasible: this.issues.length === 0,
            cost: this.estimateCost(),
            time: this.estimateTime(),
            issues: this.issues
        };
    }
    /**
     * Geometri kontrolü
     */
    checkGeometry() {
        /*
        
        Sharp corners

        Thin walls

        Impossible features


        */
        return true;
    }
    /**
     * Takım erişimi
     */
    checkAccess() {
        if (this.machine.axes < 5) {
            this.issues.push({
                type: "ACCESS",
                severity: "MEDIUM",
                message: "5 axis access may be required"
            });
        }
    }
    /**
     * Tolerans kontrolü
     */
    checkTolerance() {
        if (this.options.tolerance
            <
                this.machine.tolerance) {
            this.issues.push({
                type: "TOLERANCE",
                severity: "HIGH",
                message: "Machine tolerance insufficient"
            });
        }
    }
    /**
     * CNC kontrolü
     */
    validateCNC() {
        return {
            compatible: this.process === "CNC",
            axes: this.machine.axes
        };
    }
    /**
     * 3D Print kontrolü
     */
    validate3DPrint() {
        return {
            layerHeight: 0.2,
            supportRequired: true
        };
    }
    /**
     * Overhang analizi
     */
    analyzeOverhang(angle) {
        return {
            angle,
            requiresSupport: angle > 45
        };
    }
    /**
     * Minimum duvar kalınlığı
     */
    checkWallThickness(thickness) {
        return {
            valid: thickness >= 1,
            thickness
        };
    }
    /**
     * Maliyet tahmini
     */
    estimateCost() {
        switch (this.process) {
            case "CNC":
                return 100;
            case "3D_PRINT":
                return 30;
            case "CASTING":
                return 200;
            default:
                return 150;
        }
    }
    /**
     * Süre tahmini
     */
    estimateTime() {
        return (this.estimateCost()
            *
                0.05);
    }
    /**
     * Process planning
     */
    generateProcessPlan() {
        return {
            steps: [
                "Setup",
                "Rough Machining",
                "Finishing",
                "Inspection"
            ]
        };
    }
    /**
     * Manufacturing report
     */
    report() {
        return {
            process: this.process,
            issues: this.issues.length,
            machine: this.machine
        };
    }
    /**
     * Reset
     */
    reset() {
        this.issues = [];
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepManufacturing",
            process: this.process,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepManufacturing.js.map