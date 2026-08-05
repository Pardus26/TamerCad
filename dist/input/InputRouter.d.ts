import { PointerEvent } from "./PointerEvent";
import { GestureEvent } from "./GestureRecognizer";
export declare enum InputMode {
    Select = "select",
    Sketch = "sketch",
    Camera = "camera"
}
export declare class InputRouter {
    private mode;
    private readonly camera;
    private readonly sketch;
    private readonly selection;
    constructor();
    setMode(mode: InputMode): void;
    getMode(): InputMode;
    route(event: PointerEvent): void;
    routeGesture(event: GestureEvent): void;
    reset(): void;
    dispose(): void;
}
