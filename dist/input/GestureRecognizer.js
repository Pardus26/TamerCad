// src/input/GestureRecognizer.ts
import { PointerType, PointerAction } from "./PointerEvent";
export var GestureType;
(function (GestureType) {
    GestureType["None"] = "none";
    GestureType["Tap"] = "tap";
    GestureType["DoubleTap"] = "double-tap";
    GestureType["LongPress"] = "long-press";
    GestureType["Pan"] = "pan";
    GestureType["Pinch"] = "pinch";
    GestureType["Rotate"] = "rotate";
    GestureType["StylusDraw"] = "stylus-draw";
})(GestureType || (GestureType = {}));
export class GestureRecognizer {
    listeners = [];
    pointers = new Map();
    lastTap = 0;
    startX = 0;
    startY = 0;
    lastDistance = 0;
    lastRotation = 0;
    subscribe(listener) {
        this.listeners.push(listener);
    }
    emit(event) {
        for (const listener of this.listeners) {
            listener(event);
        }
    }
    process(pointerId, event) {
        switch (event.action) {
            case PointerAction.Down:
                this.pointerDown(pointerId, event);
                break;
            case PointerAction.Move:
                this.pointerMove(pointerId, event);
                break;
            case PointerAction.Up:
                this.pointerUp(pointerId, event);
                break;
        }
    }
    pointerDown(id, event) {
        this.pointers.set(id, event);
        this.startX =
            event.position.x;
        this.startY =
            event.position.y;
        if (this.pointers.size === 2) {
            this.initializeTwoFinger();
        }
    }
    pointerMove(id, event) {
        this.pointers.set(id, event);
        /*
         * Kalem çizimi
         */
        if (event.type === PointerType.Stylus) {
            this.emit({
                type: GestureType.StylusDraw,
                centerX: event.position.x,
                centerY: event.position.y,
                deltaX: 0,
                deltaY: 0,
                scale: 1,
                rotation: 0,
                source: event.type,
                original: event
            });
            return;
        }
        /*
         * Tek parmak hareketi
         */
        if (this.pointers.size === 1) {
            this.emit({
                type: GestureType.Pan,
                centerX: event.position.x,
                centerY: event.position.y,
                deltaX: event.position.x -
                    this.startX,
                deltaY: event.position.y -
                    this.startY,
                scale: 1,
                rotation: 0,
                source: event.type,
                original: event
            });
        }
        /*
         * İki parmak hareketi
         */
        if (this.pointers.size === 2) {
            this.processTwoFinger(event);
        }
    }
    pointerUp(id, event) {
        this.pointers.delete(id);
        const now = performance.now();
        if (now - this.lastTap < 300) {
            this.emit({
                type: GestureType.DoubleTap,
                centerX: event.position.x,
                centerY: event.position.y,
                deltaX: 0,
                deltaY: 0,
                scale: 1,
                rotation: 0,
                source: event.type,
                original: event
            });
        }
        else {
            this.emit({
                type: GestureType.Tap,
                centerX: event.position.x,
                centerY: event.position.y,
                deltaX: 0,
                deltaY: 0,
                scale: 1,
                rotation: 0,
                source: event.type,
                original: event
            });
        }
        this.lastTap =
            now;
    }
    initializeTwoFinger() {
        const pts = Array.from(this.pointers.values());
        const a = pts[0].position;
        const b = pts[1].position;
        this.lastDistance =
            Math.hypot(b.x - a.x, b.y - a.y);
        this.lastRotation =
            Math.atan2(b.y - a.y, b.x - a.x);
    }
    processTwoFinger(event) {
        const pts = Array.from(this.pointers.values());
        if (pts.length !== 2)
            return;
        const a = pts[0].position;
        const b = pts[1].position;
        const centerX = (a.x + b.x) / 2;
        const centerY = (a.y + b.y) / 2;
        const distance = Math.hypot(b.x - a.x, b.y - a.y);
        const rotation = Math.atan2(b.y - a.y, b.x - a.x);
        const scale = distance /
            this.lastDistance;
        this.emit({
            type: GestureType.Pinch,
            centerX,
            centerY,
            deltaX: 0,
            deltaY: 0,
            scale,
            rotation: 0,
            source: event.type,
            original: event
        });
        const rotationDelta = rotation -
            this.lastRotation;
        if (Math.abs(rotationDelta)
            >
                0.01) {
            this.emit({
                type: GestureType.Rotate,
                centerX,
                centerY,
                deltaX: 0,
                deltaY: 0,
                scale: 1,
                rotation: rotationDelta,
                source: event.type,
                original: event
            });
        }
        this.lastDistance =
            distance;
        this.lastRotation =
            rotation;
    }
}
//# sourceMappingURL=GestureRecognizer.js.map