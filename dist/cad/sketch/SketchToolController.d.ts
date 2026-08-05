import { Sketch } from "./Sketch";
import { SketchSolverManager } from "./SketchSolverManager";
import { ConstraintSystem } from "./ConstraintSystem";
import { SketchEntity } from "./SketchEntity";
import { SnapEngine } from "./SnapEngine";
import { Vector2 } from "../../math/Vector2";
export declare enum SketchToolType {
    Select = 0,
    Point = 1,
    Line = 2,
    Rectangle = 3,
    Circle = 4,
    Arc = 5,
    Trim = 6,
    Extend = 7,
    Pan = 8
}
export interface StylusEvent {
    x: number;
    y: number;
    pressure?: number;
    timestamp: number;
}
export interface SketchToolControllerOptions {
    sketch: Sketch;
    solver: SketchSolverManager;
    constraints: ConstraintSystem;
    snap?: SnapEngine;
}
export declare class SketchToolController {
    private readonly sketch;
    private readonly solver;
    private readonly constraints;
    private readonly snapEngine;
    private activeTool;
    private pointerDown;
    private dragStarted;
    private startPoint;
    private currentPoint;
    private selectedEntity;
    private previewEntity;
    constructor(options: SketchToolControllerOptions);
    setTool(tool: SketchToolType): void;
    getTool(): SketchToolType;
    pointerDownEvent(event: StylusEvent): void;
    pointerMoveEvent(event: StylusEvent): void;
    pointerUpEvent(event: StylusEvent): void;
    private createPoint;
    private createLine;
    private createCircle;
    getPreviewEntity(): SketchEntity | null;
    private selectAt;
    clearSelection(): void;
    getSelectedEntity(): SketchEntity | null;
    private dragSelected;
    getCurrentPoint(): Vector2 | null;
    isDragging(): boolean;
    getHoverPoint(): Vector2 | null;
    cancel(): void;
    reset(): void;
    debugInfo(): {
        tool: string;
        pointerDown: boolean;
        dragStarted: boolean;
        selected: string | null;
        preview: string | null;
        currentPoint: any;
        startPoint: any;
    };
}
