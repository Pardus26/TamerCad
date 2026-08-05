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

export class Sketch {

    public readonly metadata: SketchMetadata;

    private readonly _entities: SketchEntity[] = [];

    private readonly _constraints: SketchConstraint[] = [];

    private dirty = true;

    constructor(name = "Sketch") {

        this.metadata = {

            id: crypto.randomUUID(),

            name,

            created: Date.now(),

            modified: Date.now()

        };

    }

    /* ==========================================================
     * Collections
     * ========================================================== */

    public get entities(): readonly SketchEntity[] {

        return this._entities;

    }

    public get constraints(): readonly SketchConstraint[] {

        return this._constraints;

    }

    public entityCount(): number {

        return this._entities.length;

    }

    public constraintCount(): number {

        return this._constraints.length;

    }

    /* ==========================================================
     * Dirty
     * ========================================================== */

    public isDirty(): boolean {

        return this.dirty;

    }

    public clearDirty(): void {

        this.dirty = false;

    }

    private touch(): void {

        this.dirty = true;

        this.metadata.modified = Date.now();

    }

    /* ==========================================================
     * Entity
     * ========================================================== */

    public addEntity(
        entity: SketchEntity
    ): void {

        if (this._entities.includes(entity))
            return;

        this._entities.push(entity);

        this.touch();

    }

    public removeEntity(
        entity: SketchEntity
    ): void {

        const index =
            this._entities.indexOf(entity);

        if (index === -1)
            return;

        this._entities.splice(index, 1);

        // Entity'e bağlı constraintleri de kaldır

        this.removeConstraintsOfEntity(entity);

        this.touch();

    }

    public findEntity(
        id: string
    ): SketchEntity | undefined {

        return this._entities.find(
            e => e.id === id
        );

    }

    public clearEntities(): void {

        this._entities.length = 0;

        this.touch();

    }
    /* ==========================================================
     * Constraint Management
     * ========================================================== */

    public addConstraint(
        constraint: SketchConstraint
    ): void {

        if (this._constraints.includes(constraint))
            return;

        this._constraints.push(constraint);

        this.touch();

    }

    public removeConstraint(
        constraint: SketchConstraint
    ): void {

        const index =
            this._constraints.indexOf(constraint);

        if (index === -1)
            return;

        this._constraints.splice(index, 1);

        this.touch();

    }

    public clearConstraints(): void {

        this._constraints.length = 0;

        this.touch();

    }

    public findConstraint(
        id: string
    ): SketchConstraint | undefined {

        return this._constraints.find(
            c => c.id === id
        );

    }

    /**
     * Bir entity'ye bağlı bütün constraintleri kaldırır.
     * SketchSolverManager removeEntity() çağırınca kullanılır.
     */
    public removeConstraintsOfEntity(
        entity: SketchEntity
    ): void {

        for (
            let i = this._constraints.length - 1;
            i >= 0;
            i--
        ) {

            const constraint =
                this._constraints[i];

            const entities =
                (constraint as any).entities as
                    SketchEntity[] | undefined;

            if (
                entities &&
                entities.includes(entity)
            ) {

                this._constraints.splice(i, 1);

            }

        }

        this.touch();

    }

    /* ==========================================================
     * Selection
     * ========================================================== */

    public clearSelection(): void {

        for (const entity of this._entities) {

            entity.deselect();

        }

    }

    public getSelectedEntities():
        readonly SketchEntity[] {

        return this._entities.filter(
            e => e.selected
        );

    }

    public selectEntity(
        entity: SketchEntity,
        append = false
    ): void {

        if (!append) {

            this.clearSelection();

        }

        entity.select();

    }

    public deselectEntity(
        entity: SketchEntity
    ): void {

        entity.deselect();

    }

    public hasSelection(): boolean {

        return this._entities.some(
            e => e.selected
        );

    }

    public firstSelected():
        SketchEntity | undefined {

        return this._entities.find(
            e => e.selected
        );

    }
    /* ==========================================================
     * Visibility
     * ========================================================== */

    public getVisibleEntities():
        readonly SketchEntity[] {

        return this._entities.filter(
            entity => entity.visible
        );

    }

    public hideEntity(
        entity: SketchEntity
    ): void {

        entity.visible = false;

        this.touch();

    }

    public showEntity(
        entity: SketchEntity
    ): void {

        entity.visible = true;

        this.touch();

    }

    /* ==========================================================
     * Spatial Query
     * ========================================================== */

    public hitTest(
        x: number,
        y: number,
        tolerance = 10
    ): SketchEntity | undefined {

        let best: SketchEntity | undefined;

        let bestDistance =
            Number.MAX_VALUE;

        for (const entity of this.getVisibleEntities()) {

            const distance =
                entity.distanceTo({

                    x,

                    y,

                    distanceTo(other: any) {

                        const dx =
                            this.x - other.x;

                        const dy =
                            this.y - other.y;

                        return Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    }

                } as any);

            if (
                distance < tolerance &&
                distance < bestDistance
            ) {

                bestDistance = distance;

                best = entity;

            }

        }

        return best;

    }

    public queryRadius(
        x: number,
        y: number,
        radius: number
    ): SketchEntity[] {

        const result: SketchEntity[] = [];

        for (const entity of this.getVisibleEntities()) {

            const distance =
                entity.distanceTo({

                    x,

                    y,

                    distanceTo(other: any) {

                        const dx =
                            this.x - other.x;

                        const dy =
                            this.y - other.y;

                        return Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    }

                } as any);

            if (distance <= radius) {

                result.push(entity);

            }

        }

        return result;

    }

    /* ==========================================================
     * Bounding Box
     * ========================================================== */

    public getBoundingBox() {

        if (this._entities.length === 0) {

            return {

                minX: 0,

                minY: 0,

                maxX: 0,

                maxY: 0,

                width: 0,

                height: 0

            };

        }

        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;

        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        for (const entity of this._entities) {

            for (const point of entity.getPoints()) {

                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);

                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);

            }

        }

        return {

            minX,

            minY,

            maxX,

            maxY,

            width: maxX - minX,

            height: maxY - minY

        };

    }
    /* ==========================================================
     * Serialization
     * ========================================================== */

    public serialize(): SerializedSketch {

        return {

            metadata: {

                ...this.metadata

            },

            entities:

                this._entities.map(

                    entity => entity.serialize()

                ),

            constraints:

                this._constraints.map(

                    constraint => constraint.serialize()

                )

        };

    }

    /* ==========================================================
     * Restore
     *
     * SketchSolverManager Undo / Redo burada çalışır.
     * EntityFactory ve ConstraintFactory daha sonra
     * ekleneceği için şimdilik sadece koleksiyonları
     * temizliyoruz.
     * ========================================================== */

    public restore(

        entities: any[],

        constraints: any[]

    ): void {

        this._entities.length = 0;

        this._constraints.length = 0;

        /*
         * TODO
         *
         * EntityFactory.deserialize()
         * ConstraintFactory.deserialize()
         *
         * eklendiğinde burada gerçek objeler
         * tekrar oluşturulacak.
         */

        void entities;
        void constraints;

        this.touch();

    }

    /* ==========================================================
     * Snapshot
     * ========================================================== */

    public createSnapshot(): SerializedSketch {

        return this.serialize();

    }

    public loadSnapshot(

        snapshot: SerializedSketch

    ): void {

        this.restore(

            snapshot.entities,

            snapshot.constraints

        );

    }

    /* ==========================================================
     * Maintenance
     * ========================================================== */

    public clear(): void {

        this._entities.length = 0;

        this._constraints.length = 0;

        this.touch();

    }

    public rebuild(): void {

        for (const entity of this._entities) {

            entity.rebuild();

        }

        this.touch();

    }

    public updateModifiedTime(): void {

        this.metadata.modified =
            Date.now();

    }
    /* ==========================================================
     * Queries
     * ========================================================== */

    public containsEntity(

        entity: SketchEntity

    ): boolean {

        return this._entities.includes(entity);

    }

    public containsConstraint(

        constraint: SketchConstraint

    ): boolean {

        return this._constraints.includes(constraint);

    }

    public getEntityById(

        id: string

    ): SketchEntity | undefined {

        return this._entities.find(

            entity => entity.id === id

        );

    }

    public getConstraintById(

        id: string

    ): SketchConstraint | undefined {

        return this._constraints.find(

            constraint => constraint.id === id

        );

    }

    public filterEntities(

        predicate:

            (entity: SketchEntity) => boolean

    ): SketchEntity[] {

        return this._entities.filter(

            predicate

        );

    }

    /* ==========================================================
     * Statistics
     * ========================================================== */

    public statistics() {

        let pointCount = 0;
        let lineCount = 0;
        let circleCount = 0;
        let arcCount = 0;

        for (const entity of this._entities) {

            switch (entity.type) {

                case 0:
                    pointCount++;
                    break;

                case 1:
                    lineCount++;
                    break;

                case 2:
                    circleCount++;
                    break;

                case 3:
                    arcCount++;
                    break;

            }

        }

        return {

            entities:
                this._entities.length,

            constraints:
                this._constraints.length,

            points:
                pointCount,

            lines:
                lineCount,

            circles:
                circleCount,

            arcs:
                arcCount,

            selected:
                this.getSelectedEntities().length,

            visible:
                this.getVisibleEntities().length

        };

    }

    /* ==========================================================
     * Validation
     * ========================================================== */

    public validate(): {

        valid: boolean;

        errors: string[];

    } {

        const errors: string[] = [];

        const ids = new Set<string>();

        for (const entity of this._entities) {

            if (ids.has(entity.id)) {

                errors.push(

                    `Duplicate entity id : ${entity.id}`

                );

            }

            ids.add(entity.id);

        }

        const constraintIds = new Set<string>();

        for (const constraint of this._constraints) {

            if (constraintIds.has(constraint.id)) {

                errors.push(

                    `Duplicate constraint id : ${constraint.id}`

                );

            }

            constraintIds.add(constraint.id);

        }

        return {

            valid:

                errors.length === 0,

            errors

        };

    }
    /* ==========================================================
     * Debug
     * ========================================================== */

    public debugInfo() {

        return {

            metadata: {

                ...this.metadata

            },

            dirty: this.dirty,

            entityCount: this._entities.length,

            constraintCount: this._constraints.length,

            selected:

                this.getSelectedEntities()
                    .map(e => e.id),

            visible:

                this.getVisibleEntities()
                    .length,

            statistics:

                this.statistics(),

            validation:

                this.validate()

        };

    }

    /* ==========================================================
     * Future Extensions
     *
     * Bunlar ileride eklenecek:
     *
     * - SketchEntityFactory
     * - SketchConstraintFactory
     * - Incremental Solver Cache
     * - Spatial Index (Quadtree)
     * - Multi Sketch Support
     * - Construction Plane Support
     * - External References
     * - Expression Engine
     * ========================================================== */

}