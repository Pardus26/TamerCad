import { BRepShell } from "./BRepShell";
import { Mesh3 } from "../mesh/Mesh3";
export declare class BRepSolid {
    id: string;
    /**
     * Solid shell listesi
     */
    shells: BRepShell[];
    /**
     * Metadata
     */
    metadata: Record<string, any>;
    constructor();
    /**
     * Shell ekleme
     */
    addShell(shell: BRepShell): void;
    /**
     * Shell kaldırma
     */
    removeShell(shellId: string): void;
    /**
     * Dış shell alma
     */
    outerShell(): BRepShell | null;
    /**
     * İç boşluk shellleri
     */
    innerShells(): BRepShell[];
    /**
     * Shell sayısı
     */
    shellCount(): number;
    /**
     * Solid kapalı mı?
     */
    isClosed(): boolean;
    /**
     * Solid geçerli mi?
     */
    isValid(): boolean;
    /**
     * Mesh oluşturma
     */
    tessellate(): Mesh3;
    /**
     * Yaklaşık yüzey alanı
     */
    surfaceArea(): number;
    /**
     * Hacim
     *
     * Mesh tabanlı yaklaşık hesap
     */
    volume(): number;
    /**
     * Clone
     */
    clone(): BRepSolid;
    /**
     * Boolean operasyon hazırlığı
     */
    booleanReady(): boolean;
    /**
     * JSON export
     */
    toJSON(): {
        id: string;
        shells: string[];
    };
    toString(): string;
}
