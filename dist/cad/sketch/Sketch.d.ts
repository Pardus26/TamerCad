import { SketchEntity } from "./SketchEntity";
import { SketchConstraint } from "./SketchConstraint";
export interface SketchMetadata {
    id: string;
    name: string;
    created: number;
    modified: number;
}
export interface SerializedSketch {
    metadata: SketchMetadata;
    entities: any[];
    constraints: any[];
}
export declare class Sketch {
    readonly metadata: SketchMetadata;
    private readonly _entities;
    private readonly _constraints;
    private dirty;
    constructor(name?: string);
    get entities(): readonly SketchEntity[];
    get constraints(): readonly SketchConstraint[];
    entityCount(): number;
    constraintCount(): number;
    isDirty(): boolean;
    clearDirty(): void;
    private touch;
    addEntity(entity: SketchEntity): void;
    removeEntity(entity: SketchEntity): void;
    findEntity(id: string): SketchEntity | undefined;
    clearEntities(): void;
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(constraint: SketchConstraint): void;
    clearConstraints(): void;
    findConstraint(id: string): SketchConstraint | undefined;
    /**
     * Bir entity'ye bağlı bütün constraintleri kaldırır.
     * SketchSolverManager removeEntity() çağırınca kullanılır.
     */
    removeConstraintsOfEntity(entity: SketchEntity): void;
    clearSelection(): void;
    getSelectedEntities(): readonly SketchEntity[];
    selectEntity(entity: SketchEntity, append?: boolean): void;
    deselectEntity(entity: SketchEntity): void;
    hasSelection(): boolean;
    firstSelected(): SketchEntity | undefined;
    getVisibleEntities(): readonly SketchEntity[];
    hideEntity(entity: SketchEntity): void;
    showEntity(entity: SketchEntity): void;
    hitTest(x: number, y: number, tolerance?: number): SketchEntity | undefined;
    queryRadius(x: number, y: number, radius: number): SketchEntity[];
    getBoundingBox(): {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
        width: number;
        height: number;
    };
    serialize(): SerializedSketch;
    restore(entities: any[], constraints: any[]): void;
    createSnapshot(): SerializedSketch;
    loadSnapshot(snapshot: SerializedSketch): void;
    clear(): void;
    rebuild(): void;
    updateModifiedTime(): void;
    containsEntity(entity: SketchEntity): boolean;
    containsConstraint(constraint: SketchConstraint): boolean;
    getEntityById(id: string): SketchEntity | undefined;
    getConstraintById(id: string): SketchConstraint | undefined;
    filterEntities(predicate: (entity: SketchEntity) => boolean): SketchEntity[];
    statistics(): {
        entities: number;
        constraints: number;
        points: number;
        lines: number;
        circles: number;
        arcs: number;
        selected: number;
        visible: number;
    };
    validate(): {
        valid: boolean;
        errors: string[];
    };
    debugInfo(): {
        metadata: {
            id: string;
            name: string;
            created: number;
            modified: number;
        };
        dirty: boolean;
        entityCount: number;
        constraintCount: number;
        selected: string[];
        visible: number;
        statistics: {
            entities: number;
            constraints: number;
            points: number;
            lines: number;
            circles: number;
            arcs: number;
            selected: number;
            visible: number;
        };
        validation: {
            valid: boolean;
            errors: string[];
        };
    };
}
