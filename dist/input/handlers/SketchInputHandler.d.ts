import { PointerEvent } from "../PointerEvent";
import { GestureEvent } from "../GestureRecognizer";
export declare class SketchInputHandler {
    private drawing;
    private stroke;
    handlePointer(event: PointerEvent): void;
    private startStroke;
    private addPoint;
    private finishStroke;
    private cancelStroke;
    private createSketchEntity;
    handleGesture(event: GestureEvent): void;
    isDrawing(): boolean;
    dispose(): void;
}
