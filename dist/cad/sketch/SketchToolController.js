import { SketchPoint, SketchLine, SketchCircle } from "./SketchEntity";
import { SnapEngine } from "./SnapEngine";
import { Vector2 } from "../../math/Vector2";
/* ======================================================
 * Tool Types
 * ====================================================== */
export var SketchToolType;
(function (SketchToolType) {
    SketchToolType[SketchToolType["Select"] = 0] = "Select";
    SketchToolType[SketchToolType["Point"] = 1] = "Point";
    SketchToolType[SketchToolType["Line"] = 2] = "Line";
    SketchToolType[SketchToolType["Rectangle"] = 3] = "Rectangle";
    SketchToolType[SketchToolType["Circle"] = 4] = "Circle";
    SketchToolType[SketchToolType["Arc"] = 5] = "Arc";
    SketchToolType[SketchToolType["Trim"] = 6] = "Trim";
    SketchToolType[SketchToolType["Extend"] = 7] = "Extend";
    SketchToolType[SketchToolType["Pan"] = 8] = "Pan";
})(SketchToolType || (SketchToolType = {}));
/* ======================================================
 * Tool Controller
 * ====================================================== */
export class SketchToolController {
    sketch;
    solver;
    constraints;
    snapEngine;
    activeTool = SketchToolType.Select;
    pointerDown = false;
    dragStarted = false;
    startPoint = null;
    currentPoint = null;
    selectedEntity = null;
    previewEntity = null;
    constructor(options) {
        this.sketch =
            options.sketch;
        this.solver =
            options.solver;
        this.constraints =
            options.constraints;
        this.snapEngine =
            options.snap ??
                new SnapEngine();
    }
    /* ======================================================
     * Tool Selection
     * ====================================================== */
    setTool(tool) {
        this.cancel();
        this.activeTool = tool;
    }
    getTool() {
        return this.activeTool;
    }
    /* ======================================================
     * Pointer Down
     * ====================================================== */
    pointerDownEvent(event) {
        this.pointerDown = true;
        this.dragStarted = false;
        const snap = this.snapEngine.snap(new Vector2(event.x, event.y), this.sketch.entities);
        this.startPoint =
            snap.position.clone();
        this.currentPoint =
            snap.position.clone();
        switch (this.activeTool) {
            case SketchToolType.Select:
                this.selectAt(snap.position);
                if (this.selectedEntity) {
                    this.solver.beginDrag();
                }
                break;
            case SketchToolType.Point:
                this.createPoint(snap.position);
                this.pointerDown = false;
                break;
            case SketchToolType.Line:
                this.previewEntity =
                    new SketchLine("__preview__", snap.position, snap.position);
                break;
            case SketchToolType.Circle:
                this.previewEntity =
                    new SketchCircle("__preview__", snap.position, 0);
                break;
            default:
                break;
        }
    }
    /* ======================================================
     * Pointer Move
     * ====================================================== */
    pointerMoveEvent(event) {
        if (!this.pointerDown) {
            return;
        }
        const snap = this.snapEngine.snap(new Vector2(event.x, event.y), this.sketch.entities);
        this.currentPoint =
            snap.position.clone();
        if (this.startPoint &&
            this.currentPoint.distanceTo(this.startPoint) > 1) {
            this.dragStarted = true;
        }
        switch (this.activeTool) {
            /* ----------------------------------------------
             * Selection Drag
             * ---------------------------------------------- */
            case SketchToolType.Select:
                if (this.selectedEntity &&
                    this.dragStarted) {
                    this.dragSelected(snap.position);
                }
                break;
            /* ----------------------------------------------
             * Line Preview
             * ---------------------------------------------- */
            case SketchToolType.Line:
                if (this.previewEntity instanceof SketchLine) {
                    let end = snap.position.clone();
                    end =
                        this.snapEngine.snapAngle(this.startPoint, end);
                    this.previewEntity.end = end;
                }
                break;
            /* ----------------------------------------------
             * Circle Preview
             * ---------------------------------------------- */
            case SketchToolType.Circle:
                if (this.previewEntity instanceof SketchCircle) {
                    this.previewEntity.radius =
                        this.startPoint.distanceTo(snap.position);
                }
                break;
            default:
                break;
        }
    }
    /* ======================================================
     * Pointer Up
     * ====================================================== */
    pointerUpEvent(event) {
        if (!this.pointerDown) {
            return;
        }
        const snap = this.snapEngine.snap(new Vector2(event.x, event.y), this.sketch.entities);
        switch (this.activeTool) {
            /* ----------------------------------------------
             * Finish Line
             * ---------------------------------------------- */
            case SketchToolType.Line:
                if (this.startPoint) {
                    let end = this.snapEngine.snapAngle(this.startPoint, snap.position);
                    this.createLine(this.startPoint, end);
                }
                break;
            /* ----------------------------------------------
             * Finish Circle
             * ---------------------------------------------- */
            case SketchToolType.Circle:
                if (this.startPoint) {
                    this.createCircle(this.startPoint, snap.position);
                }
                break;
            /* ----------------------------------------------
             * Finish Drag
             * ---------------------------------------------- */
            case SketchToolType.Select:
                if (this.selectedEntity) {
                    this.solver.endDrag();
                }
                break;
            default:
                break;
        }
        this.previewEntity = null;
        this.pointerDown = false;
        this.dragStarted = false;
        this.startPoint = null;
        this.currentPoint = null;
    }
    /* ======================================================
     * Geometry Creation
     * ====================================================== */
    createPoint(position) {
        const point = new SketchPoint(crypto.randomUUID(), position.clone());
        this.solver.addEntity(point);
    }
    createLine(start, end) {
        if (start.distanceTo(end) < 0.001) {
            return;
        }
        const line = new SketchLine(crypto.randomUUID(), start.clone(), end.clone());
        this.solver.addEntity(line);
    }
    createCircle(center, edge) {
        const radius = center.distanceTo(edge);
        if (radius < 0.001) {
            return;
        }
        const circle = new SketchCircle(crypto.randomUUID(), center.clone(), radius);
        this.solver.addEntity(circle);
    }
    /* ======================================================
     * Preview
     * ====================================================== */
    getPreviewEntity() {
        return this.previewEntity;
    }
    /* ======================================================
     * Selection
     * ====================================================== */
    selectAt(position) {
        // Önce eski seçimi temizle
        if (this.selectedEntity) {
            this.selectedEntity.deselect();
            this.selectedEntity = null;
        }
        let closest = null;
        let bestDistance = Number.MAX_VALUE;
        for (const entity of this.sketch.entities) {
            if (!entity.visible) {
                continue;
            }
            const distance = entity.distanceTo(position);
            if (distance < bestDistance) {
                bestDistance = distance;
                closest = entity;
            }
        }
        if (closest &&
            bestDistance <= 12) {
            closest.select();
            this.selectedEntity = closest;
            this.solver.beginDrag();
        }
    }
    /* ======================================================
     * Selection API
     * ====================================================== */
    clearSelection() {
        if (this.selectedEntity) {
            this.selectedEntity.deselect();
            this.selectedEntity = null;
        }
    }
    getSelectedEntity() {
        return this.selectedEntity;
    }
    /* ======================================================
     * Drag Selected Entity
     * ====================================================== */
    dragSelected(position) {
        if (!this.selectedEntity ||
            !this.startPoint) {
            return;
        }
        // Hareket miktarı
        const delta = position.subtract(this.startPoint);
        // Entity kilitliyse hareket etmez
        if (this.selectedEntity.canModify()) {
            this.selectedEntity.move(delta);
            // Yeni referans noktası
            this.startPoint =
                position.clone();
            // Constraint solver canlı çalışır
            this.solver.solve();
        }
    }
    /* ======================================================
     * Current Pointer Position
     * ====================================================== */
    getCurrentPoint() {
        return this.currentPoint
            ? this.currentPoint.clone()
            : null;
    }
    /* ======================================================
     * Current Drag State
     * ====================================================== */
    isDragging() {
        return (this.pointerDown &&
            this.selectedEntity !== null);
    }
    /* ======================================================
     * Hover Preview
     * ====================================================== */
    getHoverPoint() {
        if (this.currentPoint) {
            return this.currentPoint.clone();
        }
        return null;
    }
    /* ======================================================
     * Cancel Current Tool Operation
     * ====================================================== */
    cancel() {
        this.pointerDown = false;
        this.dragStarted = false;
        this.startPoint = null;
        this.currentPoint = null;
        this.previewEntity = null;
        if (this.selectedEntity) {
            this.solver.endDrag();
        }
    }
    /* ======================================================
     * Reset Controller
     * ====================================================== */
    reset() {
        this.cancel();
        this.clearSelection();
        this.activeTool =
            SketchToolType.Select;
    }
    /* ======================================================
     * Debug
     * ====================================================== */
    debugInfo() {
        return {
            tool: SketchToolType[this.activeTool],
            pointerDown: this.pointerDown,
            dragStarted: this.dragStarted,
            selected: this.selectedEntity?.id ??
                null,
            preview: this.previewEntity?.id ??
                null,
            currentPoint: this.currentPoint,
            startPoint: this.startPoint
        };
    }
}
/* ======================================================
 * End Of File
 * ====================================================== */ 
//# sourceMappingURL=SketchToolController.js.map