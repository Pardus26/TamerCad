import { Vector3 } from "../../math/vector/Vector3";
import { RenderCamera, StandardView } from "../RenderCamera";
export interface CameraControllerOptions {
    orbitSpeed?: number;
    panSpeed?: number;
    zoomSpeed?: number;
    smoothSpeed?: number;
}
export declare class CameraController {
    private readonly camera;
    private orbitSpeed;
    private panSpeed;
    private zoomSpeed;
    private smoothSpeed;
    private pivot;
    constructor(camera: RenderCamera, options?: CameraControllerOptions);
    orbit(deltaX: number, deltaY: number): void;
    orbitAroundPoint(deltaX: number, deltaY: number, pivot: Vector3): void;
    pan(deltaX: number, deltaY: number): void;
    zoom(amount: number): void;
    dolly(amount: number): void;
    truck(amount: number): void;
    pedestal(amount: number): void;
    private translate;
    rotateAroundSelection(min: Vector3, max: Vector3, dx: number, dy: number): void;
    smoothMove(position: Vector3, target: Vector3): void;
    animateToView(view: StandardView): void;
}
