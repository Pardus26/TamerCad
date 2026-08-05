// src/input/handlers/SelectionInputHandler.ts
import { PointerAction, PointerType } from "../PointerEvent";
import { GestureType } from "../GestureRecognizer";
import { KernelBootstrap } from "../../app/KernelBootstrap";
export class SelectionInputHandler {
    selectedId = null;
    handlePointer(event) {
        /*
            Stylus çizim içindir.
            Seçim parmak ile yapılır.
        */
        if (event.type ===
            PointerType.Stylus) {
            return;
        }
        if (event.action !==
            PointerAction.Up) {
            return;
        }
        this.pick(event.position.x, event.position.y);
    }
    pick(x, y) {
        const context = KernelBootstrap
            .context();
        const ray = context.camera.pickRay(x, y);
        /*
            İlk aşama:

            Scene selection API

            Sonraki aşama:

            BVH
            Octree
            Topology picker

        */
        const result = context.scene.pick(ray.origin, ray.direction);
        if (result) {
            this.selectedId =
                result.id;
            context.scene.select(result.id);
        }
        else {
            this.clear();
        }
    }
    handleGesture(event) {
        if (event.type ===
            GestureType.Tap) {
            this.pick(event.x, event.y);
        }
    }
    getSelected() {
        return this.selectedId;
    }
    clear() {
        this.selectedId =
            null;
        KernelBootstrap
            .context()
            .scene.clearSelection();
    }
    dispose() {
        this.selectedId =
            null;
    }
}
//# sourceMappingURL=SelectionInputHandler.js.map