import { InputMode } from "../input/InputRouter";
export declare class EngineBridge {
    private static initialized;
    private static input;
    static initialize(): void;
    static resize(width: number, height: number): void;
    static update(deltaTime: number): void;
    static render(): void;
    static shutdown(): void;
    static pointerDown(id: number, x: number, y: number, pressure?: number): void;
    static pointerMove(id: number, x: number, y: number, pressure?: number): void;
    static pointerUp(id: number, x: number, y: number): void;
    static setInputMode(mode: InputMode): void;
}
