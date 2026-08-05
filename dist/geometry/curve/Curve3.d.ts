import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";
export declare abstract class Curve3 {
    id: string;
    constructor();
    /**
     * Curve üzerindeki noktayı parametre ile döndürür.
     *
     * t:
     * 0 -> başlangıç
     * 1 -> bitiş
     */
    abstract evaluate(t: number): Point3;
    /**
     * Başlangıç noktası
     */
    abstract startPoint(): Point3;
    /**
     * Bitiş noktası
     */
    abstract endPoint(): Point3;
    /**
     * Eğri uzunluğu
     */
    abstract length(): number;
    /**
     * Teğet vektörü
     */
    tangent(t: number): Vector3;
    /**
     * Eğri üzerindeki örnekleme
     */
    sample(segments?: number): Point3[];
    /**
     * Bounding box hesabı
     */
    boundingBox(): {
        min: Point3;
        max: Point3;
    };
    /**
     * Eğriyi ters çevirir
     */
    abstract reverse(): Curve3;
    clone(): Curve3;
}
