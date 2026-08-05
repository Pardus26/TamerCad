import { BRepFace } from "./BRepFace";
import { Mesh3 } from "../mesh/Mesh3";
export declare class BRepShell {
    id: string;
    /**
     * Shell yüzleri
     */
    faces: BRepFace[];
    /**
     * İç shell mi?
     */
    inner: boolean;
    /**
     * Metadata
     */
    metadata: Record<string, any>;
    constructor(inner?: boolean);
    /**
     * Face ekleme
     */
    addFace(face: BRepFace): void;
    /**
     * Face kaldırma
     */
    removeFace(faceId: string): void;
    /**
     * Face sayısı
     */
    faceCount(): number;
    /**
     * Kapalı shell kontrolü
     *
     * Basitleştirilmiş topoloji kontrolü
     */
    isClosed(): boolean;
    /**
     * Shell mesh üretimi
     */
    tessellate(): Mesh3;
    /**
     * Yaklaşık yüzey alanı
     */
    area(): number;
    /**
     * Shell yön tersleme
     */
    reverse(): void;
    /**
     * Geçerlilik kontrolü
     */
    isValid(): boolean;
    /**
     * Clone
     */
    clone(): BRepShell;
    toJSON(): {
        id: string;
        faces: string[];
        inner: boolean;
    };
    toString(): string;
}
