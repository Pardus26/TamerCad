import { Surface3 } from "../surface/Surface3";
import { Point3 } from "../point/Point3";
export declare abstract class Solid3 {
    id: string;
    /**
     * Katı sınır yüzeyleri
     */
    surfaces: Surface3[];
    constructor();
    /**
     * Solid üzerindeki yüzeyleri döndürür
     */
    getSurfaces(): Surface3[];
    /**
     * Yüzey ekleme
     */
    addSurface(surface: Surface3): void;
    /**
     * Yaklaşık bounding box
     */
    boundingBox(): {
        min: Point3;
        max: Point3;
    };
    /**
     * Hacim
     *
     * Alt sınıflar override eder.
     */
    abstract volume(): number;
    /**
     * Kütle merkezi
     */
    abstract centerOfMass(): Point3;
    /**
     * Katı doğrulama
     */
    isValid(): boolean;
    /**
     * Nokta katı içinde mi?
     */
    abstract containsPoint(point: Point3): boolean;
    /**
     * Solid tipi
     */
    abstract type(): string;
    /**
     * Kopyalama
     */
    clone(): Solid3;
    toString(): string;
}
