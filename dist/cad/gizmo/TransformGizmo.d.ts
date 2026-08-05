import { Vector3 } from "../../math/Vector3";
import { MeshBody } from "../../geometry/mesh/MeshBody";
export declare class TransformGizmo {
    private target;
    attach(body: MeshBody): void;
    move(delta: Vector3): void;
    rotate(axis: Vector3, angle: number): void;
    detach(): void;
}
