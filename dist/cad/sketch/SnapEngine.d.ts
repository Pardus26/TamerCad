import { Vector2 } from "../../math/vector/Vector2";
import { SketchEntity } from "./SketchEntity";
export declare enum SnapType {
    None = 0,
    Endpoint = 1,
    Midpoint = 2,
    Center = 3,
    Intersection = 4,
    Grid = 5,
    Angle = 6,
    Tangent = 7,
    Quadrant = 8,
    Projection = 9
}
export interface SnapResult {
    snapped: boolean;
    position: Vector2;
    type: SnapType;
    entity?: SketchEntity;
    distance: number;
    constraint?: string;
}
export interface SnapEngineOptions {
    snapDistance?: number;
    gridSize?: number;
    angleStep?: number;
    enableGrid?: boolean;
    enableAngleSnap?: boolean;
}
export declare class SnapEngine {
    private readonly snapDistance;
    private readonly gridSize;
    private readonly angleStep;
    private readonly enableGrid;
    private readonly enableAngleSnap;
    constructor(options?: SnapEngineOptions);
    snap(position: Vector2, entities: readonly SketchEntity[]): SnapResult;
    private checkEntity;
    private pointSnap;
    private endpointSnap;
    private midpointSnap;
    private projectionSnap;
    private projectPointToSegment;
    private centerSnap;
    private quadrantSnap;
    private gridSnap;
    snapAngle(start: Vector2, end: Vector2): Vector2;
    private intersectionSnap;
    private lineIntersection;
    private tangentSnap;
    private better;
    debugInfo(): {
        snapDistance: number;
        gridSize: number;
        angleStep: number;
        gridEnabled: boolean;
        angleSnapEnabled: boolean;
    };
}
