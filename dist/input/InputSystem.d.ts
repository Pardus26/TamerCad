import { PointerEvent, PointerType } from "./PointerEvent";
export type PointerListener = (pointerId: number, event: PointerEvent) => void;
export declare class InputSystem {
    private static initialized;
    private static listeners;
    private static activePointers;
    static initialize(): void;
    static subscribe(listener: PointerListener): void;
    private static emit;
    static pointerDown(id: number, x: number, y: number, pressure?: number, type?: PointerType): void;
    static pointerMove(id: number, x: number, y: number, pressure?: number, type?: PointerType): void;
    static pointerUp(id: number, x: number, y: number, type?: PointerType): void;
    static getPointer(id: number): PointerEvent | undefined;
    static getActivePointers(): PointerEvent[];
    static getPointerCount(): number;
    static clear(): void;
}
