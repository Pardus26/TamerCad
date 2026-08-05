import { Surface3 } from "./Surface3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class CylinderSurface3 extends Surface3 {
    origin: Point3;
    axis: Vector3;
    radius: number;
    private uDirection;
    private vDirection;
    constructor(origin: Point3, axis: Vector3, radius: number);
    /**
     * Silindir parametrik yüzeyi
     *
     * u : açı 0-1
     * v : eksen uzaklığı
     *
     * P(u,v)
     */
    evaluate(u: number, v: number): Point3;
    startPoint(): Point3;
    normal(u: number, _v: number): Vector3;
    /**
     * Silindir üzerindeki nokta kontrolü
     */
    containsPoint(point: Point3, tolerance?: number): boolean;
    /**
     * Yarıçap değişimi
     */
    setRadius(radius: number): void;
    /**
     * Silindir çevresi
     */
    circumference(): number;
    type(): string;
    clone(): CylinderSurface3;
    toString(): string;
}
