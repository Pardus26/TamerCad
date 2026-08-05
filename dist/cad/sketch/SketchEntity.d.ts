import { Vector2 } from "../../math/vector/Vector2";
export declare enum SketchEntityType {
    Point = 0,
    Line = 1,
    Circle = 2,
    Arc = 3
}
export declare enum SketchEntityFlags {
    None = 0,
    Selected = 1,
    Hidden = 2,
    Fixed = 4,
    Construction = 8,
    Dirty = 16
}
export interface SketchAnchorPoint {
    id: string;
    position: Vector2;
}
export interface SketchHandle {
    id: string;
    position: Vector2;
}
export interface SketchBoundingBox {
    min: Vector2;
    max: Vector2;
}
export interface SerializedSketchEntity {
    id: string;
    version: number;
    type: SketchEntityType;
    flags: number;
}
export declare abstract class SketchEntity {
    readonly id: string;
    readonly type: SketchEntityType;
    protected flags: number;
    protected version: number;
    protected boundingBoxDirty: boolean;
    protected cachedBoundingBox?: SketchBoundingBox;
    protected constructor(id: string, type: SketchEntityType);
    get selected(): boolean;
    set selected(value: boolean);
    get fixed(): boolean;
    set fixed(value: boolean);
    get construction(): boolean;
    set construction(value: boolean);
    get visible(): boolean;
    set visible(value: boolean);
    get dirty(): boolean;
    protected setDirty(): void;
    clearDirty(): void;
    abstract getPoints(): readonly Vector2[];
    abstract getAnchorPoints(): readonly SketchAnchorPoint[];
    abstract getHandles(): readonly SketchHandle[];
    abstract move(delta: Vector2): void;
    abstract rotate(center: Vector2, angle: number): void;
    abstract scale(center: Vector2, factor: number): void;
    abstract clone(): SketchEntity;
    abstract rebuild(): void;
    getBoundingBox(): SketchBoundingBox;
    closestPoint(point: Vector2): Vector2;
    distanceTo(point: Vector2): number;
    projectPoint(point: Vector2): Vector2;
    hitTest(point: Vector2, tolerance?: number): boolean;
    findNearestHandle(point: Vector2, tolerance?: number): SketchHandle | null;
    findNearestAnchor(point: Vector2, tolerance?: number): SketchAnchorPoint | null;
    select(): void;
    deselect(): void;
    toggleSelection(): void;
    hide(): void;
    show(): void;
    lock(): void;
    unlock(): void;
    serialize(): SerializedSketchEntity;
    protected restoreBaseState(data: SerializedSketchEntity): void;
    protected touch(): void;
    getVersion(): number;
    protected translatePoint(point: Vector2, delta: Vector2): void;
    protected rotatePoint(point: Vector2, center: Vector2, angle: number): void;
    protected scalePoint(point: Vector2, center: Vector2, factor: number): void;
    canModify(): boolean;
    invalidateGeometry(): void;
    equals(other: SketchEntity): boolean;
    debugInfo(): {
        id: string;
        type: string;
        version: number;
        flags: number;
        visible: boolean;
        selected: boolean;
        fixed: boolean;
        construction: boolean;
        boundingBox: SketchBoundingBox;
    };
}
export declare class SketchPoint extends SketchEntity {
    position: Vector2;
    constructor(id: string, position: Vector2);
    getPoints(): readonly Vector2[];
    getAnchorPoints(): readonly SketchAnchorPoint[];
    getHandles(): readonly SketchHandle[];
    move(delta: Vector2): void;
    rotate(center: Vector2, angle: number): void;
    scale(center: Vector2, factor: number): void;
    clone(): SketchEntity;
    rebuild(): void;
    serialize(): any;
}
export declare class SketchLine extends SketchEntity {
    start: Vector2;
    end: Vector2;
    constructor(id: string, start: Vector2, end: Vector2);
    getPoints(): readonly Vector2[];
    getAnchorPoints(): readonly SketchAnchorPoint[];
    getHandles(): readonly SketchHandle[];
    length(): number;
    direction(): Vector2;
    midpoint(): Vector2;
    closestPoint(point: Vector2): Vector2;
    distanceTo(point: Vector2): number;
    move(delta: Vector2): void;
    rotate(center: Vector2, angle: number): void;
    scale(center: Vector2, factor: number): void;
    clone(): SketchEntity;
    rebuild(): void;
    serialize(): any;
}
export declare class SketchCircle extends SketchEntity {
    center: Vector2;
    radius: number;
    constructor(id: string, center: Vector2, radius: number);
    getPoints(): readonly Vector2[];
    getAnchorPoints(): readonly SketchAnchorPoint[];
    getHandles(): readonly SketchHandle[];
    closestPoint(point: Vector2): Vector2;
    distanceTo(point: Vector2): number;
    move(delta: Vector2): void;
    rotate(center: Vector2, angle: number): void;
    scale(center: Vector2, factor: number): void;
    clone(): SketchEntity;
    rebuild(): void;
    serialize(): any;
}
export declare class SketchArc extends SketchEntity {
    center: Vector2;
    radius: number;
    startAngle: number;
    endAngle: number;
    constructor(id: string, center: Vector2, radius: number, startAngle: number, endAngle: number);
    getPoints(): readonly Vector2[];
    getAnchorPoints(): readonly SketchAnchorPoint[];
    getHandles(): readonly SketchHandle[];
    private getStartPoint;
    private getEndPoint;
    closestPoint(point: Vector2): Vector2;
    distanceTo(point: Vector2): number;
    move(delta: Vector2): void;
    rotate(center: Vector2, angle: number): void;
    scale(center: Vector2, factor: number): void;
    private clampAngle;
    clone(): SketchEntity;
    rebuild(): void;
    serialize(): any;
}
