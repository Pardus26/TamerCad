import { RenderCamera } from "./RenderCamera";
export interface ViewportRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ViewportState {
    rectangle: ViewportRectangle;
    pixelRatio: number;
    enabled: boolean;
}
export declare class RenderViewport {
    private readonly camera;
    private rectangle;
    private pixelRatio;
    private enabled;
    constructor(camera: RenderCamera, width?: number, height?: number);
    resize(width: number, height: number): void;
    setPosition(x: number, y: number): void;
    setPixelRatio(ratio: number): void;
    getPixelRatio(): number;
    getWidth(): number;
    getHeight(): number;
    getAspectRatio(): number;
    getRectangle(): ViewportRectangle;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    apply(nativeContext: any): void;
    screenCenter(): {
        x: number;
        y: number;
    };
    contains(x: number, y: number): boolean;
    saveState(): ViewportState;
    restoreState(state: ViewportState): void;
    toJSON(): ViewportState;
    static fromJSON(camera: RenderCamera, json: any): RenderViewport;
}
