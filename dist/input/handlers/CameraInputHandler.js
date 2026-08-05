// src/input/handlers/CameraInputHandler.ts
import { PointerAction, PointerType } from "../PointerEvent";
import { GestureType } from "../GestureRecognizer";
import { KernelBootstrap } from "../../app/KernelBootstrap";
export class CameraInputHandler {
    active = false;
    lastX = 0;
    lastY = 0;
    activePointers = new Map();
    handlePointer(event) {
        /*
            Kalem kamera kontrolü yapmaz.
            Shapr3D mantığı:
            kalem = modelleme
            parmak = kamera
        */
        if (event.type ===
            PointerType.Stylus) {
            return;
        }
        switch (event.action) {
            case PointerAction.Down:
                this.active = true;
                this.lastX =
                    event.position.x;
                this.lastY =
                    event.position.y;
                break;
            case PointerAction.Move:
                if (!this.active)
                    return;
                const dx = event.position.x -
                    this.lastX;
                const dy = event.position.y -
                    this.lastY;
                const camera = KernelBootstrap.context()
                    .camera;
                camera.orbit(dx * 0.01, dy * 0.01);
                this.lastX =
                    event.position.x;
                this.lastY =
                    event.position.y;
                break;
            case PointerAction.Up:
            case PointerAction.Cancel:
                this.active = false;
                break;
        }
    }
    handleGesture(event) {
        const camera = KernelBootstrap.context()
            .camera;
        switch (event.type) {
            case GestureType.Pan:
                camera.pan(event.deltaX, event.deltaY);
                break;
            case GestureType.Rotate:
                camera.orbit(event.rotationX, event.rotationY);
                break;
            case GestureType.Zoom:
                camera.zoom(event.scaleDelta);
                break;
        }
    }
    dispose() {
        this.activePointers.clear();
        this.active = false;
    }
}
//# sourceMappingURL=CameraInputHandler.js.map