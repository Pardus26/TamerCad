export class Sketch {
    metadata;
    _entities = [];
    _constraints = [];
    dirty = true;
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
    get entities() {
        return this._entities;
    }
    get constraints() {
        return this._constraints;
    }
    entityCount() {
        return this._entities.length;
    }
    constraintCount() {
        return this._constraints.length;
    }
    /* ==========================================================
     * Dirty
     * ========================================================== */
    isDirty() {
        return this.dirty;
    }
    clearDirty() {
        this.dirty = false;
    }
    touch() {
        this.dirty = true;
        this.metadata.modified = Date.now();
    }
    /* ==========================================================
     * Entity
     * ========================================================== */
    addEntity(entity) {
        if (this._entities.includes(entity))
            return;
        this._entities.push(entity);
        this.touch();
    }
    removeEntity(entity) {
        const index = this._entities.indexOf(entity);
        if (index === -1)
            return;
        this._entities.splice(index, 1);
        // Entity'e bağlı constraintleri de kaldır
        this.removeConstraintsOfEntity(entity);
        this.touch();
    }
    findEntity(id) {
        return this._entities.find(e => e.id === id);
    }
    clearEntities() {
        this._entities.length = 0;
        this.touch();
    }
    /* ==========================================================
     * Constraint Management
     * ========================================================== */
    addConstraint(constraint) {
        if (this._constraints.includes(constraint))
            return;
        this._constraints.push(constraint);
        this.touch();
    }
    removeConstraint(constraint) {
        const index = this._constraints.indexOf(constraint);
        if (index === -1)
            return;
        this._constraints.splice(index, 1);
        this.touch();
    }
    clearConstraints() {
        this._constraints.length = 0;
        this.touch();
    }
    findConstraint(id) {
        return this._constraints.find(c => c.id === id);
    }
    /**
     * Bir entity'ye bağlı bütün constraintleri kaldırır.
     * SketchSolverManager removeEntity() çağırınca kullanılır.
     */
    removeConstraintsOfEntity(entity) {
        for (let i = this._constraints.length - 1; i >= 0; i--) {
            const constraint = this._constraints[i];
            const entities = constraint.entities;
            if (entities &&
                entities.includes(entity)) {
                this._constraints.splice(i, 1);
            }
        }
        this.touch();
    }
    /* ==========================================================
     * Selection
     * ========================================================== */
    clearSelection() {
        for (const entity of this._entities) {
            entity.deselect();
        }
    }
    getSelectedEntities() {
        return this._entities.filter(e => e.selected);
    }
    selectEntity(entity, append = false) {
        if (!append) {
            this.clearSelection();
        }
        entity.select();
    }
    deselectEntity(entity) {
        entity.deselect();
    }
    hasSelection() {
        return this._entities.some(e => e.selected);
    }
    firstSelected() {
        return this._entities.find(e => e.selected);
    }
    /* ==========================================================
     * Visibility
     * ========================================================== */
    getVisibleEntities() {
        return this._entities.filter(entity => entity.visible);
    }
    hideEntity(entity) {
        entity.visible = false;
        this.touch();
    }
    showEntity(entity) {
        entity.visible = true;
        this.touch();
    }
    /* ==========================================================
     * Spatial Query
     * ========================================================== */
    hitTest(x, y, tolerance = 10) {
        let best;
        let bestDistance = Number.MAX_VALUE;
        for (const entity of this.getVisibleEntities()) {
            const distance = entity.distanceTo({
                x,
                y,
                distanceTo(other) {
                    const dx = this.x - other.x;
                    const dy = this.y - other.y;
                    return Math.sqrt(dx * dx +
                        dy * dy);
                }
            });
            if (distance < tolerance &&
                distance < bestDistance) {
                bestDistance = distance;
                best = entity;
            }
        }
        return best;
    }
    queryRadius(x, y, radius) {
        const result = [];
        for (const entity of this.getVisibleEntities()) {
            const distance = entity.distanceTo({
                x,
                y,
                distanceTo(other) {
                    const dx = this.x - other.x;
                    const dy = this.y - other.y;
                    return Math.sqrt(dx * dx +
                        dy * dy);
                }
            });
            if (distance <= radius) {
                result.push(entity);
            }
        }
        return result;
    }
    /* ==========================================================
     * Bounding Box
     * ========================================================== */
    getBoundingBox() {
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
    serialize() {
        return {
            metadata: {
                ...this.metadata
            },
            entities: this._entities.map(entity => entity.serialize()),
            constraints: this._constraints.map(constraint => constraint.serialize())
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
    restore(entities, constraints) {
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
    createSnapshot() {
        return this.serialize();
    }
    loadSnapshot(snapshot) {
        this.restore(snapshot.entities, snapshot.constraints);
    }
    /* ==========================================================
     * Maintenance
     * ========================================================== */
    clear() {
        this._entities.length = 0;
        this._constraints.length = 0;
        this.touch();
    }
    rebuild() {
        for (const entity of this._entities) {
            entity.rebuild();
        }
        this.touch();
    }
    updateModifiedTime() {
        this.metadata.modified =
            Date.now();
    }
    /* ==========================================================
     * Queries
     * ========================================================== */
    containsEntity(entity) {
        return this._entities.includes(entity);
    }
    containsConstraint(constraint) {
        return this._constraints.includes(constraint);
    }
    getEntityById(id) {
        return this._entities.find(entity => entity.id === id);
    }
    getConstraintById(id) {
        return this._constraints.find(constraint => constraint.id === id);
    }
    filterEntities(predicate) {
        return this._entities.filter(predicate);
    }
    /* ==========================================================
     * Statistics
     * ========================================================== */
    statistics() {
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
            entities: this._entities.length,
            constraints: this._constraints.length,
            points: pointCount,
            lines: lineCount,
            circles: circleCount,
            arcs: arcCount,
            selected: this.getSelectedEntities().length,
            visible: this.getVisibleEntities().length
        };
    }
    /* ==========================================================
     * Validation
     * ========================================================== */
    validate() {
        const errors = [];
        const ids = new Set();
        for (const entity of this._entities) {
            if (ids.has(entity.id)) {
                errors.push(`Duplicate entity id : ${entity.id}`);
            }
            ids.add(entity.id);
        }
        const constraintIds = new Set();
        for (const constraint of this._constraints) {
            if (constraintIds.has(constraint.id)) {
                errors.push(`Duplicate constraint id : ${constraint.id}`);
            }
            constraintIds.add(constraint.id);
        }
        return {
            valid: errors.length === 0,
            errors
        };
    }
    /* ==========================================================
     * Debug
     * ========================================================== */
    debugInfo() {
        return {
            metadata: {
                ...this.metadata
            },
            dirty: this.dirty,
            entityCount: this._entities.length,
            constraintCount: this._constraints.length,
            selected: this.getSelectedEntities()
                .map(e => e.id),
            visible: this.getVisibleEntities()
                .length,
            statistics: this.statistics(),
            validation: this.validate()
        };
    }
}
//# sourceMappingURL=Sketch.js.map