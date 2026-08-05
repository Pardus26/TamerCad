import { Surface3 } from "../surface/Surface3";
import { BRepLoop } from "./BRepLoop";
import { Mesh3 } from "../mesh/Mesh3";
export declare class BRepFace {
    id: string;
    /**
     * Geometrik yüzey
     */
    surface: Surface3;
    /**
     * Dış sınır
     */
    outerLoop: BRepLoop;
    /**
     * Delik loopları
     */
    innerLoops: BRepLoop[];
    /**
     * Yüz yönü
     */
    reversed: boolean;
    /**
     * Metadata
     */
    metadata: Record<string, any>;
    constructor(surface: Surface3, outerLoop: BRepLoop);
    /**
     * İç loop ekleme
     */
    addInnerLoop(loop: BRepLoop): void;
    /**
     * İç loop silme
     */
    removeInnerLoop(index: number): void;
    /**
     * Loop sayısı
     */
    loopCount(): number;
    /**
     * Yüz ters çevirme
     */
    reverse(): void;
    /**
     * Yaklaşık alan hesabı
     */
    area(): number;
    /**
     * Mesh üretimi
     */
    tessellate(): Mesh3;
    /**
     * Yüz geçerli mi
     */
    isValid(): boolean;
    /**
     * Nokta yüz üzerinde mi
     */
    containsPoint(point: any): boolean;
    /**
     * Clone
     */
    clone(): BRepFace;
    /**
     * JSON export
     */
    toJSON(): {
        id: string;
        outerLoop: string;
        innerLoops: string[];
        reversed: boolean;
    };
    toString(): string;
}
