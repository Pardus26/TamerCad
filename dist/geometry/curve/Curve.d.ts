import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { Direction } from "../core/Direction";
import { Transform } from "../core/Transform";
import { BoundingBox } from "../core/BoundingBox";
export declare abstract class Curve {
    /**
     * Parametre aralığı
     */
    abstract get startParameter(): number;
    abstract get endParameter(): number;
    /**
     * Parametrik değerlendirme
     *
     * C(t)
     */
    abstract evaluate(t: number): Point;
    /**
     * Birinci türev
     *
     * dC/dt
     */
    abstract derivative(t: number): Vector3;
    /**
     * Teğet yönü
     */
    tangent(t: number): Direction;
    /**
     * Eğri uzunluğu
     */
    abstract length(): number;
    /**
     * Yaklaşık bounding box
     */
    abstract boundingBox(): BoundingBox;
    /**
     * Noktaya en yakın nokta
     */
    abstract closestPoint(point: Point): Point;
    /**
     * Eğriyi ters çevir
     */
    abstract reverse(): Curve;
    /**
     * Transform uygula
     */
    abstract transform(transform: Transform): Curve;
    /**
     * Parametre normalize
     *
     * 0-1 aralığı
     */
    normalizedParameter(t: number): number;
    /**
     * Başlangıç noktası
     */
    startPoint(): Point;
    /**
     * Bitiş noktası
     */
    endPoint(): Point;
    /**
     * Eğri kapalı mı?
     */
    isClosed(tolerance?: number): boolean;
}
