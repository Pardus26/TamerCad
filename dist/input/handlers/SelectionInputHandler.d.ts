import { PointerEvent } from "../PointerEvent";
import { GestureEvent } from "../GestureRecognizer";
export declare class SelectionInputHandler {
    private selectedId;
    handlePointer(event: PointerEvent): void;
    private pick;
    handleGesture(event: GestureEvent): void;
    getSelected(): string | null;
    clear(): void;
    dispose(): void;
}
