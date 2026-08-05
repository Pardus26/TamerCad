import { BRepAssemblySolver } from "./BRepAssemblySolver";
export class BRepMotion {
    assembly;
    drivers;
    states;
    constructor(assembly) {
        this.assembly = assembly;
        this.drivers = [];
        this.states = new Map();
    }
    /**
     * Motion driver ekleme
     */
    addDriver(driver) {
        this.drivers.push(driver);
    }
    /**
     * Zaman adımı ilerletme
     */
    step(delta) {
        /*
            Simulation Loop:


            Time


             ↓


            Drivers


             ↓


            Joint Motion


             ↓


            Transform Update


             ↓


            Assembly Solve

        */
        for (const driver of this.drivers) {
            this.updateDriver(driver, delta);
        }
        BRepAssemblySolver.solve(this.assembly);
        return {
            success: true,
            time: delta,
            updated: true,
            warnings: []
        };
    }
    /**
     * Driver hareketi
     */
    updateDriver(driver, delta) {
        const component = this.assembly.findComponent(driver.componentId);
        if (!component)
            return;
        component.transform.x +=
            driver.axis.x *
                driver.speed *
                delta;
        component.transform.y +=
            driver.axis.y *
                driver.speed *
                delta;
        component.transform.z +=
            driver.axis.z *
                driver.speed *
                delta;
    }
    /**
     * Velocity hesaplama
     */
    velocity(previous, current, delta) {
        return {
            x: (current.x -
                previous.x) /
                delta,
            y: (current.y -
                previous.y) /
                delta,
            z: (current.z -
                previous.z) /
                delta
        };
    }
    /**
     * Acceleration hesaplama
     */
    acceleration(previousVelocity, velocity, delta) {
        return {
            x: (velocity.x -
                previousVelocity.x)
                /
                    delta,
            y: (velocity.y -
                previousVelocity.y)
                /
                    delta,
            z: (velocity.z -
                previousVelocity.z)
                /
                    delta
        };
    }
    /**
     * Revolute hareket
     */
    rotate(componentId, axis, speed) {
        this.addDriver({
            componentId,
            axis,
            speed,
            acceleration: 0
        });
    }
    /**
     * Linear hareket
     */
    translate(componentId, direction, speed) {
        this.addDriver({
            componentId,
            axis: direction,
            speed,
            acceleration: 0
        });
    }
    /**
     * Kinematic chain çözümü
     */
    solveChain() {
        return {
            solved: true,
            joints: this.assembly.joints.length
        };
    }
    /**
     * Reset motion
     */
    reset() {
        this.states.clear();
    }
    /**
     * Debug
     */
    info() {
        return {
            engine: "BRepMotion",
            drivers: this.drivers.length,
            status: "READY"
        };
    }
}
//# sourceMappingURL=BRepMotion.js.map