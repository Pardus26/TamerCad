import { PointerEvent, PointerType } from "./PointerEvent";
export declare enum GestureType {
    None = "none",
    Tap = "tap",
    DoubleTap = "double-tap",
    LongPress = "long-press",
    Pan = "pan",
    Pinch = "pinch",
    Rotate = "rotate",
    StylusDraw = "stylus-draw"
}
export interface GestureEvent {
    type: GestureType;
    centerX: number;
    centerY: number;
    deltaX: number;
    deltaY: number;
    /**
     * Zoom oranı
     *
     * 1.0 = değişiklik yok
     * >1 zoom in
     * <1 zoom out
     */
    scale: number;
    /**
     * Radyan dönüş miktarı
     */
    rotation: number;
    source: PointerType;
    original: PointerEvent;
}
export type GestureListener = (event: GestureEvent) => void;
export declare class GestureRecognizer {
    private listeners;
    private pointers;
    private lastTap;
    private startX;
    private startY;
    private lastDistance;
    private lastRotation;
    subscribe(listener: GestureListener): void;
    private emit;
    process(pointerId: number, event: PointerEvent): void;
    private pointerDown;
    private pointerMove;
    private pointerUp;
    private initializeTwoFinger;
    private processTwoFinger;
}
