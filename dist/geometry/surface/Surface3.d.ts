import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare abstract class Surface3 {
    id: string;
    constructor();
    /**
     * Parametric surface evaluation
     *
     * u,v:
     * Surface parametreleri
     */
    abstract evaluate(u: number, v: number): Point3;
    /**
     * Surface normal hesaplama
     */
    normal(u: number, v: number): Vector3;
    /**
     * Surface üzerinde nokta örnekleme
     */
    sample(uSegments?: number, vSegments?: number): Point3[];
    /**
     * Bounding box
     */
    boundingBox(): {
        min: Point3;
        max: Point3;
    };
    /**
     * Surface alanı yaklaşık hesabı
     */
    area(uSegments?: number, vSegments?: number): number;
    /**
     * Surface tipi
     */
    abstract type(): string;
    clone(): Surface3;
}
