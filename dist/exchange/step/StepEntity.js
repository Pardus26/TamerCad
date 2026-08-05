export class CartesianPoint {
    id;
    name;
    x;
    y;
    z;
    type = "CARTESIAN_POINT";
    constructor(id, name, x, y, z) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class Direction {
    id;
    name;
    x;
    y;
    z;
    type = "DIRECTION";
    constructor(id, name, x, y, z) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
export class Vector {
    id;
    name;
    direction;
    magnitude;
    type = "VECTOR";
    constructor(id, name, direction, magnitude) {
        this.id = id;
        this.name = name;
        this.direction = direction;
        this.magnitude = magnitude;
    }
}
export class Axis2Placement3D {
    id;
    name;
    location;
    axis;
    refDirection;
    type = "AXIS2_PLACEMENT_3D";
    constructor(id, name, location, axis, refDirection) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.axis = axis;
        this.refDirection = refDirection;
    }
}
export class Line {
    id;
    name;
    point;
    vector;
    type = "LINE";
    constructor(id, name, point, vector) {
        this.id = id;
        this.name = name;
        this.point = point;
        this.vector = vector;
    }
}
export class Circle {
    id;
    name;
    placement;
    radius;
    type = "CIRCLE";
    constructor(id, name, placement, radius) {
        this.id = id;
        this.name = name;
        this.placement = placement;
        this.radius = radius;
    }
}
export class Plane {
    id;
    name;
    placement;
    type = "PLANE";
    constructor(id, name, placement) {
        this.id = id;
        this.name = name;
        this.placement = placement;
    }
}
export class VertexPoint {
    id;
    name;
    point;
    type = "VERTEX_POINT";
    constructor(id, name, point) {
        this.id = id;
        this.name = name;
        this.point = point;
    }
}
export class EdgeCurve {
    id;
    edgeStart;
    edgeEnd;
    curve;
    sameSense;
    type = "EDGE_CURVE";
    constructor(id, edgeStart, edgeEnd, curve, sameSense) {
        this.id = id;
        this.edgeStart = edgeStart;
        this.edgeEnd = edgeEnd;
        this.curve = curve;
        this.sameSense = sameSense;
    }
}
export class OrientedEdge {
    id;
    edgeElement;
    orientation;
    type = "ORIENTED_EDGE";
    constructor(id, edgeElement, orientation) {
        this.id = id;
        this.edgeElement = edgeElement;
        this.orientation = orientation;
    }
}
export class EdgeLoop {
    id;
    edges;
    type = "EDGE_LOOP";
    constructor(id, edges) {
        this.id = id;
        this.edges = edges;
    }
}
export class FaceBound {
    id;
    loop;
    orientation;
    type = "FACE_BOUND";
    constructor(id, loop, orientation) {
        this.id = id;
        this.loop = loop;
        this.orientation = orientation;
    }
}
export class AdvancedFace {
    id;
    bounds;
    surface;
    sameSense;
    type = "ADVANCED_FACE";
    constructor(id, bounds, surface, sameSense) {
        this.id = id;
        this.bounds = bounds;
        this.surface = surface;
        this.sameSense = sameSense;
    }
}
export class ClosedShell {
    id;
    faces;
    type = "CLOSED_SHELL";
    constructor(id, faces) {
        this.id = id;
        this.faces = faces;
    }
}
export class ManifoldSolidBrep {
    id;
    name;
    shell;
    type = "MANIFOLD_SOLID_BREP";
    constructor(id, name, shell) {
        this.id = id;
        this.name = name;
        this.shell = shell;
    }
}
//# sourceMappingURL=StepEntity.js.map