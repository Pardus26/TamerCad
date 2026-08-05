export interface StepEntity {
    id: number;
    type: string;
}
export declare class CartesianPoint implements StepEntity {
    id: number;
    name: string;
    x: number;
    y: number;
    z: number;
    readonly type = "CARTESIAN_POINT";
    constructor(id: number, name: string, x: number, y: number, z: number);
}
export declare class Direction implements StepEntity {
    id: number;
    name: string;
    x: number;
    y: number;
    z: number;
    readonly type = "DIRECTION";
    constructor(id: number, name: string, x: number, y: number, z: number);
}
export declare class Vector implements StepEntity {
    id: number;
    name: string;
    direction: number;
    magnitude: number;
    readonly type = "VECTOR";
    constructor(id: number, name: string, direction: number, magnitude: number);
}
export declare class Axis2Placement3D implements StepEntity {
    id: number;
    name: string;
    location: number;
    axis: number;
    refDirection: number;
    readonly type = "AXIS2_PLACEMENT_3D";
    constructor(id: number, name: string, location: number, axis: number, refDirection: number);
}
export declare class Line implements StepEntity {
    id: number;
    name: string;
    point: number;
    vector: number;
    readonly type = "LINE";
    constructor(id: number, name: string, point: number, vector: number);
}
export declare class Circle implements StepEntity {
    id: number;
    name: string;
    placement: number;
    radius: number;
    readonly type = "CIRCLE";
    constructor(id: number, name: string, placement: number, radius: number);
}
export declare class Plane implements StepEntity {
    id: number;
    name: string;
    placement: number;
    readonly type = "PLANE";
    constructor(id: number, name: string, placement: number);
}
export declare class VertexPoint implements StepEntity {
    id: number;
    name: string;
    point: number;
    readonly type = "VERTEX_POINT";
    constructor(id: number, name: string, point: number);
}
export declare class EdgeCurve implements StepEntity {
    id: number;
    edgeStart: number;
    edgeEnd: number;
    curve: number;
    sameSense: boolean;
    readonly type = "EDGE_CURVE";
    constructor(id: number, edgeStart: number, edgeEnd: number, curve: number, sameSense: boolean);
}
export declare class OrientedEdge implements StepEntity {
    id: number;
    edgeElement: number;
    orientation: boolean;
    readonly type = "ORIENTED_EDGE";
    constructor(id: number, edgeElement: number, orientation: boolean);
}
export declare class EdgeLoop implements StepEntity {
    id: number;
    edges: number[];
    readonly type = "EDGE_LOOP";
    constructor(id: number, edges: number[]);
}
export declare class FaceBound implements StepEntity {
    id: number;
    loop: number;
    orientation: boolean;
    readonly type = "FACE_BOUND";
    constructor(id: number, loop: number, orientation: boolean);
}
export declare class AdvancedFace implements StepEntity {
    id: number;
    bounds: number[];
    surface: number;
    sameSense: boolean;
    readonly type = "ADVANCED_FACE";
    constructor(id: number, bounds: number[], surface: number, sameSense: boolean);
}
export declare class ClosedShell implements StepEntity {
    id: number;
    faces: number[];
    readonly type = "CLOSED_SHELL";
    constructor(id: number, faces: number[]);
}
export declare class ManifoldSolidBrep implements StepEntity {
    id: number;
    name: string;
    shell: number;
    readonly type = "MANIFOLD_SOLID_BREP";
    constructor(id: number, name: string, shell: number);
}
