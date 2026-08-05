import { Sketch } from "./Sketch";
import { SketchSolver } from "./SketchSolver";
import { SketchValidator } from "./SketchValidator";
import { SketchProfile } from "./SketchProfile";
export class SketchManager {
    sketches = new Map();
    activeSketch = null;
    validator;
    constructor() {
        this.validator =
            new SketchValidator();
    }
    createSketch(id, plane) {
        const sketch = new Sketch(id, plane);
        this.sketches.set(id, sketch);
        this.activeSketch =
            sketch;
        return sketch;
    }
    deleteSketch(id) {
        const removed = this.sketches.delete(id);
        if (this.activeSketch?.id === id) {
            this.activeSketch =
                null;
        }
        return removed;
    }
    getSketch(id) {
        return (this.sketches.get(id)
            ??
                null);
    }
    getActiveSketch() {
        return this.activeSketch;
    }
    activateSketch(id) {
        const sketch = this.getSketch(id);
        if (!sketch) {
            return false;
        }
        this.activeSketch =
            sketch;
        return true;
    }
    renameSketch(id, name) {
        const sketch = this.getSketch(id);
        if (!sketch) {
            return false;
        }
        sketch.name =
            name;
        return true;
    }
    solve(sketch) {
        const target = sketch ??
            this.activeSketch;
        if (!target) {
            throw new Error("No active sketch");
        }
        const solver = new SketchSolver(target.entities, target.constraints);
        solver.solve();
        return solver;
    }
    validate(sketch) {
        const target = sketch ??
            this.activeSketch;
        if (!target) {
            return [];
        }
        return this.validator
            .validateSketch(target);
    }
    createProfile(entities) {
        return new SketchProfile(entities);
    }
    findEntity(entityId) {
        for (const sketch of this.sketches.values()) {
            const entity = sketch.entities.find(e => e.id === entityId);
            if (entity) {
                return entity;
            }
        }
        return null;
    }
    update() {
        if (this.activeSketch) {
            this.solve(this.activeSketch);
        }
    }
    listSketches() {
        return Array.from(this.sketches.values());
    }
}
//# sourceMappingURL=SketchManager.js.map