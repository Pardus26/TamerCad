import { InputRouter, InputMode } from "./InputRouter";
import { PointerType } from "./PointerEvent";
export declare class InputController {
    private readonly router;
    private readonly gestures;
    private initialized;
    private activePointers;
    constructor(router: InputRouter);
    initialize(): void;
    private handlePointer;
    private handleGesture;
    setMode(mode: InputMode): void;
    getMode(): InputMode;
    pointerDown(id: number, x: number, y: number, pressure?: number, type?: PointerType): void;
    pointerMove(id: number, x: number, y: number, pressure?: number, type?: PointerType): void;
    pointerUp(id: number, x: number, y: number, type?: PointerType): void;
    getActivePointerCount(): number;
    isStylusActive(): boolean;
    shutdown(): void;
}
