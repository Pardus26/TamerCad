import { Solid3 } from "./Solid3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class CylinderSolid3 extends Solid3 {
    origin: Point3;
    axis: Vector3;
    radius: number;
    height: number;
    constructor(origin: Point3, radius: number, height: number, axis?: Vector3);
    /**
     * Cylinder sınır yüzeyleri
     *
     * 1 adet lateral cylinder
     * 2 adet planar cap
     */
    private createSurfaces;
    /**
     * Hacim
     */
    volume(): number;
    /**
     * Kütle merkezi
     */
    centerOfMass(): Point3;
    /**
     * Nokta silindir içinde mi?
     */
    containsPoint(point: Point3): boolean;
    /**
     * Yan yüzey alanı
     */
    lateralSurfaceArea(): number;
    /**
     * Toplam yüzey alanı
     */
    surfaceArea(): number;
    /**
     * Boyut güncelleme
     */
    resize(radius: number, height: number): void;
    type(): string;
    clone(): CylinderSolid3;
    toString(): string;
}
