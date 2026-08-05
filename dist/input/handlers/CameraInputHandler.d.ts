import { PointerEvent } from "../PointerEvent";
import { GestureEvent } from "../GestureRecognizer";
export declare class CameraInputHandler {
    private active;
    private lastX;
    private lastY;
    private activePointers;
    handlePointer(event: PointerEvent): void;
    handleGesture(event: GestureEvent): void;
    dispose(): void;
}
