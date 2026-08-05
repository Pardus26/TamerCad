import { Point3 } from "../point/Point3";
import { Curve3 } from "../curve/Curve3";
import { BRepConstraint } from "./BRepConstraint";
export declare enum SketchEntityType {
    POINT = "point",
    LINE = "line",
    CIRCLE = "circle",
    CURVE = "curve"
}
export interface SketchEntity {
    id: string;
    type: SketchEntityType;
    geometry: Curve3 | null;
}
export interface SketchProfile {
    closed: boolean;
    curves: Curve3[];
}
export interface SketchResult {
    success: boolean;
    profile: SketchProfile | null;
    error?: string;
}
export declare class BRepSketch {
    id: string;
    name: string;
    entities: SketchEntity[];
    constraints: BRepConstraint[];
    origin: Point3;
    constructor(id: string, name: string);
    /**
     * Entity ekleme
     */
    addEntity(entity: SketchEntity): void;
    /**
     * Constraint bağlama
     */
    addConstraint(constraint: BRepConstraint): void;
    /**
     * Sketch çözümü
     */
    solveConstraints(): void;
    /**
     * Closed profile kontrolü
     */
    isClosed(): boolean;
    /**
     * Profil çıkarma
     */
    generateProfile(): SketchResult;
    /**
     * Feature input hazırlama
     */
    toFeatureInput(): {
        sketchId: string;
        profiles: SketchResult;
    };
    /**
     * Entity bulma
     */
    findEntity(id: string): SketchEntity | null;
    /**
     * Entity silme
     */
    removeEntity(id: string): void;
    /**
     * Sketch temizleme
     */
    clear(): void;
    /**
     * Sketch bilgisi
     */
    info(): {
        id: string;
        name: string;
        entities: number;
        constraints: number;
    };
    /**
     * Clone
     */
    clone(): BRepSketch;
    /**
     * Debug
     */
    static info(): {
        engine: string;
        status: string;
    };
}
