import { Point } from "../../geometry/core/Point";
import { Vector3 } from "../../geometry/core/Vector3";
import { CylinderSurface } from "../../geometry/surface/CylinderSurface";
import { PlaneSurface } from "../../geometry/surface/PlaneSurface";
import { Vertex } from "../../topology/core/Vertex";
import { Edge } from "../../topology/core/Edge";
import { Wire } from "../../topology/core/Wire";
import { Face } from "../../topology/core/Face";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Cylinder {
    radius;
    height;
    center;
    axis;
    constructor(radius, height, center = new Point(0, 0, 0), axis = new Vector3(0, 0, 1)) {
        this.radius = radius;
        this.height = height;
        this.center = center;
        this.axis = axis;
    }
    build() {
        const builder = new BRepBuilder();
        const bottomCenter = this.center;
        const topCenter = new Point(this.center.x +
            this.axis.x *
                this.height, this.center.y +
            this.axis.y *
                this.height, this.center.z +
            this.axis.z *
                this.height);
        const vertices = this.createVertices(bottomCenter, topCenter);
        const edges = this.createEdges(vertices);
        const faces = this.createFaces(edges);
        const shell = builder.createShell(faces);
        return builder.createSolid(shell);
    }
    createVertices(bottom, top) {
        const segments = 32;
        const vertices = [];
        for (let i = 0; i < segments; i++) {
            const angle = (Math.PI * 2 * i)
                /
                    segments;
            const x = Math.cos(angle)
                *
                    this.radius;
            const y = Math.sin(angle)
                *
                    this.radius;
            vertices.push(new Vertex(new Point(bottom.x + x, bottom.y + y, bottom.z)));
            vertices.push(new Vertex(new Point(top.x + x, top.y + y, top.z)));
        }
        return vertices;
    }
    createEdges(vertices) {
        const edges = [];
        const count = vertices.length / 2;
        for (let i = 0; i < count; i++) {
            const next = (i + 1)
                %
                    count;
            const bottomA = vertices[i * 2];
            const bottomB = vertices[next * 2];
            const topA = vertices[i * 2 + 1];
            const topB = vertices[next * 2 + 1];
            edges.push(new Edge(bottomA, bottomB));
            edges.push(new Edge(topA, topB));
            edges.push(new Edge(bottomA, topA));
        }
        return edges;
    }
    createFaces(edges) {
        const faces = [];
        const sideSurface = new CylinderSurface(this.radius, this.height);
        faces.push(new Face(sideSurface, this.createWire(edges)));
        faces.push(new Face(new PlaneSurface(), this.createWire(edges)));
        faces.push(new Face(new PlaneSurface(), this.createWire(edges)));
        return faces;
    }
    createWire(edges) {
        const wire = new Wire();
        for (const edge of edges) {
            wire.addHalfEdge(edge.halfEdge1);
        }
        return wire;
    }
}
//# sourceMappingURL=Cylinder.js.map