import { Vector3 } from "../math/vector/Vector3";
import { Matrix4 } from "../math/matrix/Matrix4";
export declare enum ProjectionType {
    Perspective = 0,
    Orthographic = 1
}
export declare enum StandardView {
    ISO = 0,
    TOP = 1,
    BOTTOM = 2,
    FRONT = 3,
    BACK = 4,
    LEFT = 5,
    RIGHT = 6
}
export interface CameraRay {
    origin: Vector3;
    direction: Vector3;
}
export interface CameraState {
    position: Vector3;
    target: Vector3;
    up: Vector3;
    distance: number;
    yaw: number;
    pitch: number;
}
export declare class RenderCamera {
    private projection;
    private position;
    private target;
    private up;
    private width;
    private height;
    private fov;
    private near;
    private far;
    private orthoHeight;
    private distance;
    private yaw;
    private pitch;
    constructor();
    setViewport(width: number, height: number): void;
    setAspectRatio(ratio: number): void;
    getAspectRatio(): number;
    setPerspective(fov: number, near: number, far: number): void;
    setOrthographic(height: number, near: number, far: number): void;
    getProjection(): ProjectionType;
    lookAt(position: Vector3, target: Vector3, up?: Vector3): void;
    private updateOrbitPosition;
    getViewMatrix(): Matrix4;
    getProjectionMatrix(): Matrix4;
    worldToScreen(world: Vector3): Vector3;
    screenToWorld(x: number, y: number, depth: number): Vector3;
    pickRay(x: number, y: number): CameraRay;
    isoView(): void;
    topView(): void;
    frontView(): void;
    rightView(): void;
    fitBounds(min: Vector3, max: Vector3): void;
    getPosition(): Vector3;
    getTarget(): Vector3;
    getForward(): Vector3;
    getRight(): Vector3;
    saveState(): CameraState;
    restoreState(state: CameraState): void;
    orbit(dx: number, dy: number): void;
    pan(dx: number, dy: number): void;
    zoom(amount: number): void;
    rotate(angle: number): void;
    reset(): void;
    dispose(): void;
}
