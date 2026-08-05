import { Sketch } from "./Sketch";

import { SketchSolverManager } from "./SketchSolverManager";

import { ConstraintSystem } from "./ConstraintSystem";

import {

    SketchEntity,

    SketchPoint,

    SketchLine,

    SketchCircle

} from "./SketchEntity";

import {

    SnapEngine,

    SnapResult,

    SnapType

} from "./SnapEngine";

import { Vector2 } from "../../math/Vector2";

/* ======================================================
 * Tool Types
 * ====================================================== */

export enum SketchToolType {

    Select,

    Point,

    Line,

    Rectangle,

    Circle,

    Arc,

    Trim,

    Extend,

    Pan

}

/* ======================================================
 * Stylus Event
 * ====================================================== */

export interface StylusEvent {

    x:number;

    y:number;

    pressure?:number;

    timestamp:number;

}

/* ======================================================
 * Controller Options
 * ====================================================== */

export interface SketchToolControllerOptions {

    sketch:Sketch;

    solver:SketchSolverManager;

    constraints:ConstraintSystem;

    snap?:SnapEngine;

}

/* ======================================================
 * Tool Controller
 * ====================================================== */

export class SketchToolController {

    private readonly sketch:Sketch;

    private readonly solver:SketchSolverManager;

    private readonly constraints:ConstraintSystem;

    private readonly snapEngine:SnapEngine;

    private activeTool =

        SketchToolType.Select;

    private pointerDown = false;

    private dragStarted = false;

    private startPoint:

        Vector2 | null = null;

    private currentPoint:

        Vector2 | null = null;

    private selectedEntity:

        SketchEntity | null = null;

    private previewEntity:

        SketchEntity | null = null;

    constructor(

        options:SketchToolControllerOptions

    ){

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

    setTool(

        tool: SketchToolType

    ): void {

        this.cancel();

        this.activeTool = tool;

    }

    getTool():

        SketchToolType {

        return this.activeTool;

    }

    /* ======================================================
     * Pointer Down
     * ====================================================== */

    pointerDownEvent(

        event: StylusEvent

    ): void {

        this.pointerDown = true;

        this.dragStarted = false;

        const snap =

            this.snapEngine.snap(

                new Vector2(

                    event.x,

                    event.y

                ),

                this.sketch.entities

            );

        this.startPoint =

            snap.position.clone();

        this.currentPoint =

            snap.position.clone();

        switch (

            this.activeTool

        ) {

            case SketchToolType.Select:

                this.selectAt(

                    snap.position

                );

                if (

                    this.selectedEntity

                ) {

                    this.solver.beginDrag();

                }

                break;

            case SketchToolType.Point:

                this.createPoint(

                    snap.position

                );

                this.pointerDown = false;

                break;

            case SketchToolType.Line:

                this.previewEntity =

                    new SketchLine(

                        "__preview__",

                        snap.position,

                        snap.position

                    );

                break;

            case SketchToolType.Circle:

                this.previewEntity =

                    new SketchCircle(

                        "__preview__",

                        snap.position,

                        0

                    );

                break;

            default:

                break;

        }

    }
    /* ======================================================
     * Pointer Move
     * ====================================================== */

    pointerMoveEvent(

        event: StylusEvent

    ): void {

        if (

            !this.pointerDown

        ) {

            return;

        }

        const snap =

            this.snapEngine.snap(

                new Vector2(

                    event.x,

                    event.y

                ),

                this.sketch.entities

            );

        this.currentPoint =

            snap.position.clone();

        if (

            this.startPoint &&

            this.currentPoint.distanceTo(

                this.startPoint

            ) > 1

        ) {

            this.dragStarted = true;

        }

        switch (

            this.activeTool

        ) {

            /* ----------------------------------------------
             * Selection Drag
             * ---------------------------------------------- */

            case SketchToolType.Select:

                if (

                    this.selectedEntity &&

                    this.dragStarted

                ) {

                    this.dragSelected(

                        snap.position

                    );

                }

                break;

            /* ----------------------------------------------
             * Line Preview
             * ---------------------------------------------- */

            case SketchToolType.Line:

                if (

                    this.previewEntity instanceof SketchLine

                ) {

                    let end =

                        snap.position.clone();

                    end =

                        this.snapEngine.snapAngle(

                            this.startPoint!,

                            end

                        );

                    this.previewEntity.end = end;

                }

                break;

            /* ----------------------------------------------
             * Circle Preview
             * ---------------------------------------------- */

            case SketchToolType.Circle:

                if (

                    this.previewEntity instanceof SketchCircle

                ) {

                    this.previewEntity.radius =

                        this.startPoint!.distanceTo(

                            snap.position

                        );

                }

                break;

            default:

                break;

        }

    }
    /* ======================================================
     * Pointer Up
     * ====================================================== */

    pointerUpEvent(

        event: StylusEvent

    ): void {

        if (

            !this.pointerDown

        ) {

            return;

        }

        const snap =

            this.snapEngine.snap(

                new Vector2(

                    event.x,

                    event.y

                ),

                this.sketch.entities

            );

        switch (

            this.activeTool

        ) {

            /* ----------------------------------------------
             * Finish Line
             * ---------------------------------------------- */

            case SketchToolType.Line:

                if (

                    this.startPoint

                ) {

                    let end =

                        this.snapEngine.snapAngle(

                            this.startPoint,

                            snap.position

                        );

                    this.createLine(

                        this.startPoint,

                        end

                    );

                }

                break;

            /* ----------------------------------------------
             * Finish Circle
             * ---------------------------------------------- */

            case SketchToolType.Circle:

                if (

                    this.startPoint

                ) {

                    this.createCircle(

                        this.startPoint,

                        snap.position

                    );

                }

                break;

            /* ----------------------------------------------
             * Finish Drag
             * ---------------------------------------------- */

            case SketchToolType.Select:

                if (

                    this.selectedEntity

                ) {

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

    private createPoint(

        position: Vector2

    ): void {

        const point =

            new SketchPoint(

                crypto.randomUUID(),

                position.clone()

            );

        this.solver.addEntity(

            point

        );

    }

    private createLine(

        start: Vector2,

        end: Vector2

    ): void {

        if (

            start.distanceTo(end) < 0.001

        ) {

            return;

        }

        const line =

            new SketchLine(

                crypto.randomUUID(),

                start.clone(),

                end.clone()

            );

        this.solver.addEntity(

            line

        );

    }

    private createCircle(

        center: Vector2,

        edge: Vector2

    ): void {

        const radius =

            center.distanceTo(edge);

        if (

            radius < 0.001

        ) {

            return;

        }

        const circle =

            new SketchCircle(

                crypto.randomUUID(),

                center.clone(),

                radius

            );

        this.solver.addEntity(

            circle

        );

    }

    /* ======================================================
     * Preview
     * ====================================================== */

    getPreviewEntity():

        SketchEntity | null {

        return this.previewEntity;

    }
    /* ======================================================
     * Selection
     * ====================================================== */

    private selectAt(

        position: Vector2

    ): void {

        // Önce eski seçimi temizle

        if (

            this.selectedEntity

        ) {

            this.selectedEntity.deselect();

            this.selectedEntity = null;

        }

        let closest:

            SketchEntity | null = null;

        let bestDistance =

            Number.MAX_VALUE;

        for (

            const entity of this.sketch.entities

        ) {

            if (

                !entity.visible

            ) {

                continue;

            }

            const distance =

                entity.distanceTo(

                    position

                );

            if (

                distance < bestDistance

            ) {

                bestDistance = distance;

                closest = entity;

            }

        }

        if (

            closest &&

            bestDistance <= 12

        ) {

            closest.select();

            this.selectedEntity = closest;

            this.solver.beginDrag();

        }

    }

    /* ======================================================
     * Selection API
     * ====================================================== */

    clearSelection(): void {

        if (

            this.selectedEntity

        ) {

            this.selectedEntity.deselect();

            this.selectedEntity = null;

        }

    }

    getSelectedEntity():

        SketchEntity | null {

        return this.selectedEntity;

    }
    /* ======================================================
     * Drag Selected Entity
     * ====================================================== */

    private dragSelected(

        position: Vector2

    ): void {

        if (

            !this.selectedEntity ||

            !this.startPoint

        ) {

            return;

        }

        // Hareket miktarı

        const delta =

            position.subtract(

                this.startPoint

            );

        // Entity kilitliyse hareket etmez

        if (

            this.selectedEntity.canModify()

        ) {

            this.selectedEntity.move(

                delta

            );

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

    getCurrentPoint():

        Vector2 | null {

        return this.currentPoint

            ? this.currentPoint.clone()

            : null;

    }

    /* ======================================================
     * Current Drag State
     * ====================================================== */

    isDragging():

        boolean {

        return (

            this.pointerDown &&

            this.selectedEntity !== null

        );

    }

    /* ======================================================
     * Hover Preview
     * ====================================================== */

    getHoverPoint():

        Vector2 | null {

        if (

            this.currentPoint

        ) {

            return this.currentPoint.clone();

        }

        return null;

    }
    /* ======================================================
     * Cancel Current Tool Operation
     * ====================================================== */

    cancel(): void {

        this.pointerDown = false;

        this.dragStarted = false;

        this.startPoint = null;

        this.currentPoint = null;

        this.previewEntity = null;

        if (

            this.selectedEntity

        ) {

            this.solver.endDrag();

        }

    }

    /* ======================================================
     * Reset Controller
     * ====================================================== */

    reset(): void {

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

            tool:

                SketchToolType[

                    this.activeTool

                ],

            pointerDown:

                this.pointerDown,

            dragStarted:

                this.dragStarted,

            selected:

                this.selectedEntity?.id ??

                null,

            preview:

                this.previewEntity?.id ??

                null,

            currentPoint:

                this.currentPoint,

            startPoint:

                this.startPoint

        };

    }

}

/* ======================================================
 * End Of File
 * ====================================================== */