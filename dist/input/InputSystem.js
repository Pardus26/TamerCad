// src/input/InputSystem.ts
import { PointerType, PointerAction } from "./PointerEvent";
export class InputSystem {
    static initialized = false;
    static listeners = [];
    static activePointers = new Map();
    static initialize() {
        if (this.initialized)
            return;
        this.initialized =
            true;
        console.info("[InputSystem] Initialized");
    }
    static subscribe(listener) {
        this.listeners.push(listener);
    }
    static emit(id, event) {
        for (const listener of this.listeners) {
            listener(id, event);
        }
    }
    static pointerDown(id, x, y, pressure = 1, type = PointerType.Stylus) {
        const event = {
            action: PointerAction.Down,
            type,
            position: {
                x,
                y
            },
            pressure,
            timestamp: performance.now()
        };
        this.activePointers.set(id, event);
        this.emit(id, event);
    }
    static pointerMove(id, x, y, pressure = 1, type = PointerType.Stylus) {
        const event = {
            action: PointerAction.Move,
            type,
            position: {
                x,
                y
            },
            pressure,
            timestamp: performance.now()
        };
        this.activePointers.set(id, event);
        this.emit(id, event);
    }
    static pointerUp(id, x, y, type = PointerType.Stylus) {
        const event = {
            action: PointerAction.Up,
            type,
            position: {
                x,
                y
            },
            pressure: 0,
            timestamp: performance.now()
        };
        this.activePointers.delete(id);
        this.emit(id, event);
    }
    static getPointer(id) {
        return this.activePointers.get(id);
    }
    static getActivePointers() {
        return Array.from(this.activePointers.values());
    }
    static getPointerCount() {
        return this.activePointers.size;
    }
    static clear() {
        this.activePointers.clear();
        this.listeners = [];
        this.initialized =
            false;
    }
}
//# sourceMappingURL=InputSystem.js.map