// src/input/handlers/SketchInputHandler.ts
import { PointerAction, PointerType } from "../PointerEvent";
import { GestureType } from "../GestureRecognizer";
import { KernelBootstrap } from "../../app/KernelBootstrap";
import { Point3 } from "../../geometry/point/Point3";
export class SketchInputHandler {
    drawing = false;
    stroke = [];
    handlePointer(event) {
        /*
            Sadece kalem çizim yapar
        */
        if (event.type !==
            PointerType.Stylus) {
            return;
        }
        switch (event.action) {
            case PointerAction.Down:
                this.startStroke(event);
                break;
            case PointerAction.Move:
                this.addPoint(event);
                break;
            case PointerAction.Up:
                this.finishStroke();
                break;
            case PointerAction.Cancel:
                this.cancelStroke();
                break;
        }
    }
    startStroke(event) {
        this.drawing = true;
        this.stroke = [];
        this.addPoint(event);
    }
    addPoint(event) {
        if (!this.drawing) {
            return;
        }
        this.stroke.push({
            x: event.position.x,
            y: event.position.y,
            pressure: event.pressure,
            timestamp: event.timestamp
        });
    }
    finishStroke() {
        if (this.stroke.length < 2) {
            this.cancelStroke();
            return;
        }
        this.createSketchEntity();
        this.stroke = [];
        this.drawing = false;
    }
    cancelStroke() {
        this.stroke = [];
        this.drawing = false;
    }
    createSketchEntity() {
        const camera = KernelBootstrap
            .context()
            .camera;
        const points = this.stroke.map(p => {
            const world = camera.screenToWorld(p.x, p.y, 0);
            return new Point3(world.x, world.y, world.z);
        });
        /*
            Şimdilik geçici:

            Stroke -> Sketch Entity

            Daha sonra:

            LineEntity
            ArcEntity
            SplineEntity

            olarak ayrılacak.
        */
        const scene = KernelBootstrap
            .context()
            .scene;
        scene.addSketchStroke(points);
    }
    handleGesture(event) {
        if (event.type ===
            GestureType.Stroke) {
            // İleride:
            // kalem hareket komutları
        }
    }
    isDrawing() {
        return this.drawing;
    }
    dispose() {
        this.stroke = [];
        this.drawing = false;
    }
}
//# sourceMappingURL=SketchInputHandler.js.map