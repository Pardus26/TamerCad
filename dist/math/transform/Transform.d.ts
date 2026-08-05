import { Vector3 } from "../vector/Vector3";
import { Matrix4 } from "../matrix/Matrix4";
export declare class Transform {
    position: Vector3;
    rotation: Vector3;
    scale: Vector3;
    constructor();
    setPosition(position: Vector3): Transform;
    setRotation(rotation: Vector3): Transform;
    setScale(scale: Vector3): Transform;
    translate(offset: Vector3): Transform;
    rotate(rotation: Vector3): Transform;
    resize(scale: Vector3): Transform;
    getMatrix(): Matrix4;
    clone(): Transform;
}
