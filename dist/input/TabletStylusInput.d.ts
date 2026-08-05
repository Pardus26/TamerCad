export interface StylusState {
    x: number;
    y: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    buttons: number;
    isDown: boolean;
}
export declare class TabletStylusInput {
    private state;
    update(event: PointerEvent): void;
    getState(): StylusState;
}
