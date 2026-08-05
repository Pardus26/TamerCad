import { Point } from "./Point";
import { Direction } from "./Direction";
import { Transform } from "./Transform";
import { Line } from "./Line";
export declare class Plane {
    origin: Point;
    normal: Direction;
    constructor(origin: Point, normal: Direction);
    /**
     * Noktanın düzleme izdüşümü
     */
    projectPoint(point: Point): Point;
    /**
     * Noktanın düzleme uzaklığı
     */
    distanceToPoint(point: Point): number;
    /**
     * Nokta düzlem üzerinde mi?
     */
    containsPoint(point: Point, tolerance?: number): boolean;
    /**
     * Doğru düzleme paralel mi?
     */
    isLineParallel(line: Line): boolean;
    /**
     * Düzlemin karşı tarafı
     */
    sideOfPoint(point: Point): number;
    /**
     * Normal yönünü ters çevirir
     */
    reverse(): Plane;
    transform(transform: Transform): Plane;
    /**
     * Üç noktadan düzlem oluşturma
     */
    static fromPoints(a: Point, b: Point, c: Point): Plane;
    static XY(): Plane;
    static XZ(): Plane;
    static YZ(): Plane;
}
