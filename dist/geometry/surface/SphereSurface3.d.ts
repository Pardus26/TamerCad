import { Surface3 } from "./Surface3";
import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare class SphereSurface3 extends Surface3 {
    center: Point3;
    radius: number;
    constructor(center: Point3, radius: number);
    /**
     * Sphere parametrik yüzeyi
     *
     * u : longitude 0-1
     * v : latitude 0-1
     */
    evaluate(u: number, v: number): Point3;
    /**
     * Başlangıç noktası
     */
    startPoint(): Point3;
    /**
     * Küre normal vektörü
     */
    normal(u: number, v: number): Vector3;
    /**
     * Noktanın küre üzerinde olup olmadığı
     */
    containsPoint(point: Point3, tolerance?: number): boolean;
    /**
     * Küre yüzey alanı
     */
    surfaceArea(): number;
    /**
     * Küre hacmi
     */
    volume(): number;
    /**
     * Yarıçap değiştirme
     */
    setRadius(radius: number): void;
    type(): string;
    clone(): SphereSurface3;
    toString(): string;
}
