import { BRepEdge } from "./BRepEdge";
import { Point3 } from "../point/Point3";
export declare class BRepLoop {
    id: string;
    /**
     * Loop edge sırası
     */
    edges: BRepEdge[];
    /**
     * Dış sınır mı?
     */
    outer: boolean;
    /**
     * Metadata
     */
    metadata: Record<string, any>;
    constructor(outer?: boolean);
    /**
     * Edge ekleme
     */
    addEdge(edge: BRepEdge): void;
    /**
     * Edge kaldırma
     */
    removeEdge(edgeId: string): void;
    /**
     * Edge sayısı
     */
    edgeCount(): number;
    /**
     * Loop kapalı mı?
     */
    isClosed(tolerance?: number): boolean;
    /**
     * Loop başlangıç noktası
     */
    startPoint(): Point3 | null;
    /**
     * Loop uzunluğu
     */
    perimeter(): number;
    /**
     * Edge sırasını ters çevirme
     */
    reverse(): void;
    /**
     * Dış / iç loop değişimi
     */
    toggleOuter(): void;
    /**
     * Loop kopyalama
     */
    clone(): BRepLoop;
    /**
     * Loop doğrulama
     */
    isValid(): boolean;
    /**
     * JSON export
     */
    toJSON(): {
        id: string;
        edges: string[];
        outer: boolean;
    };
    toString(): string;
}
