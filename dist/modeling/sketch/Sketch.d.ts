import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { Wire } from "../../topology/core/Wire";
export declare enum SketchGeometryType {
    Line = "Line",
    Circle = "Circle",
    Arc = "Arc",
    Spline = "Spline"
}
export interface SketchGeometry {
    id: string;
    type: SketchGeometryType;
    points: Point[];
}
export interface SketchConstraint {
    id: string;
    type: string;
    value?: number;
    references: string[];
}
export declare class Sketch {
    name: string;
    origin: Point;
    normal: Vector3;
    geometries: SketchGeometry[];
    constraints: SketchConstraint[];
    constructor(name: string, origin?: Point, normal?: Vector3);
    addGeometry(geometry: SketchGeometry): void;
    removeGeometry(id: string): void;
    addConstraint(constraint: SketchConstraint): void;
    removeConstraint(id: string): void;
    solve(): boolean;
    isClosed(): boolean;
    toWire(): Wire;
    private geometryToEdge;
}
