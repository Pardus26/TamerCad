import { Solid3 } from "./Solid3";
import { Point3 } from "../point/Point3";
export declare class BoxSolid3 extends Solid3 {
    origin: Point3;
    width: number;
    height: number;
    depth: number;
    constructor(origin: Point3, width: number, height: number, depth: number);
    /**
     * 6 adet düzlem yüzey oluşturur
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
     * Nokta katı içinde mi?
     */
    containsPoint(point: Point3): boolean;
    /**
     * Yüzey alanı
     */
    surfaceArea(): number;
    /**
     * Boyut güncelleme
     */
    resize(width: number, height: number, depth: number): void;
    type(): string;
    clone(): BoxSolid3;
    toString(): string;
}
