import { BRepVertex } from "./BRepVertex";
import { Curve3 } from "../curve/Curve3";
export declare class BRepEdge {
    id: string;
    /**
     * Başlangıç vertex
     */
    startVertex: BRepVertex;
    /**
     * Bitiş vertex
     */
    endVertex: BRepVertex;
    /**
     * Edge geometrisi
     */
    curve: Curve3;
    /**
     * Bağlı yüzler
     */
    faces: string[];
    /**
     * Yön
     */
    reversed: boolean;
    /**
     * Metadata
     */
    metadata: Record<string, any>;
    constructor(startVertex: BRepVertex, endVertex: BRepVertex, curve: Curve3);
    /**
     * Edge uzunluğu
     */
    length(): number;
    /**
     * Başlangıç noktası
     */
    startPoint(): import("../point/Point3").Point3;
    /**
     * Bitiş noktası
     */
    endPoint(): import("../point/Point3").Point3;
    /**
     * Yüz bağlantısı ekleme
     */
    addFace(faceId: string): void;
    /**
     * Yüz bağlantısı silme
     */
    removeFace(faceId: string): void;
    /**
     * Bağlı yüz sayısı
     */
    faceCount(): number;
    /**
     * Edge yön ters çevirme
     */
    reverse(): void;
    /**
     * Edge üzerinde nokta
     */
    evaluate(t: number): import("../point/Point3").Point3;
    /**
     * Clone
     */
    clone(): BRepEdge;
    /**
     * Edge doğrulama
     */
    isValid(): boolean;
    toJSON(): {
        id: string;
        startVertex: string;
        endVertex: string;
        faces: string[];
        reversed: boolean;
    };
    toString(): string;
}
