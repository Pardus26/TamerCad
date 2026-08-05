import { Solid3 } from "./Solid3";
import { Point3 } from "../point/Point3";
export declare class SphereSolid3 extends Solid3 {
    center: Point3;
    radius: number;
    constructor(center: Point3, radius: number);
    /**
     * Küre sınır yüzeyi
     */
    private createSurface;
    /**
     * Küre hacmi
     */
    volume(): number;
    /**
     * Kütle merkezi
     */
    centerOfMass(): Point3;
    /**
     * Nokta küre içinde mi?
     */
    containsPoint(point: Point3): boolean;
    /**
     * Küre yüzey alanı
     */
    surfaceArea(): number;
    /**
     * Çap
     */
    diameter(): number;
    /**
     * Yarıçap değiştirme
     */
    resize(radius: number): void;
    type(): string;
    clone(): SphereSolid3;
    toString(): string;
}
