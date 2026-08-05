// src/input/InputController.ts
import { InputSystem } from "./InputSystem";
import { GestureRecognizer } from "./GestureRecognizer";
import { PointerType } from "./PointerEvent";
export class InputController {
    router;
    gestures;
    initialized = false;
    activePointers = new Map();
    constructor(router) {
        this.router =
            router;
        this.gestures =
            new GestureRecognizer();
    }
    initialize() {
        if (this.initialized)
            return;
        InputSystem.initialize();
        InputSystem.subscribe((id, event) => {
            this.handlePointer(id, event);
        });
        this.gestures.subscribe((event) => {
            this.handleGesture(event);
        });
        this.initialized =
            true;
        console.info("[InputController] Initialized");
    }
    handlePointer(id, event) {
        switch (event.action) {
            case "down":
                this.activePointers.set(id, event);
                break;
            case "move":
                this.activePointers.set(id, event);
                break;
            case "up":
                this.activePointers.delete(id);
                break;
        }
        /*
         * Gesture motoruna gönder
         */
        this.gestures.process(id, event);
        /*
         * Aktif moda yönlendir
         */
        this.router.route(event);
    }
    handleGesture(event) {
        this.router.routeGesture(event);
    }
    setMode(mode) {
        this.router.setMode(mode);
    }
    getMode() {
        return this.router.getMode();
    }
    // ------------------------------------------------
    // External Pointer API
    // Android Bridge için
    // ------------------------------------------------
    pointerDown(id, x, y, pressure = 1, type = PointerType.Stylus) {
        InputSystem.pointerDown(id, x, y, pressure, type);
    }
    pointerMove(id, x, y, pressure = 1, type = PointerType.Stylus) {
        InputSystem.pointerMove(id, x, y, pressure, type);
    }
    pointerUp(id, x, y, type = PointerType.Stylus) {
        InputSystem.pointerUp(id, x, y, type);
    }
    getActivePointerCount() {
        return this.activePointers.size;
    }
    isStylusActive() {
        for (const pointer of this.activePointers.values()) {
            if (pointer.type ===
                PointerType.Stylus)
                return true;
        }
        return false;
    }
    shutdown() {
        this.activePointers.clear();
        InputSystem.clear();
        this.initialized =
            false;
        console.info("[InputController] Shutdown");
    }
}
//# sourceMappingURL=InputController.js.map