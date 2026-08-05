import { Face } from "../core/Face";
import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
import { Wire } from "../core/Wire";
import { Point } from "../../geometry/core/Point";
import { SolidClassifier } from "./SolidClassifier";
export class Splitter {
    tolerance;
    classifier;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
        this.classifier =
            new SolidClassifier(tolerance);
    }
    splitFace(face, splitterCurve) {
        const errors = [];
        if (!face.surface) {
            return {
                faces: [face],
                edges: [],
                vertices: [],
                success: false,
                errors: [
                    "Face has no surface"
                ]
            };
        }
        const intersectionPoints = this.findCurveIntersections(face, splitterCurve);
        if (intersectionPoints.length < 2) {
            return {
                faces: [face],
                edges: [],
                vertices: [],
                success: false,
                errors: [
                    "Insufficient split points"
                ]
            };
        }
        const splitEdges = this.createSplitEdges(intersectionPoints);
        const wires = this.createSplitWires(face, splitEdges);
        const faces = wires.map(wire => new Face(face.surface, wire));
        return {
            faces,
            edges: splitEdges,
            vertices: this.collectVertices(splitEdges),
            success: true,
            errors
        };
    }
    splitSolid(solid, tool) {
        const newFaces = [];
        const newEdges = [];
        const newVertices = [];
        const errors = [];
        for (const faceA of solid.getFaces()) {
            let splitted = false;
            for (const faceB of tool.getFaces()) {
                const intersection = this.intersectFaces(faceA, faceB);
                if (intersection.intersects) {
                    const result = this.splitFace(faceA, intersection.curve);
                    if (result.success) {
                        newFaces.push(...result.faces);
                        newEdges.push(...result.edges);
                        newVertices.push(...result.vertices);
                        splitted = true;
                    }
                }
            }
            if (!splitted) {
                newFaces.push(faceA);
            }
        }
        return {
            faces: newFaces,
            edges: newEdges,
            vertices: newVertices,
            success: errors.length === 0,
            errors
        };
    }
    intersectFaces(a, b) {
        if (!a.surface
            ||
                !b.surface) {
            return {
                intersects: false,
                points: [],
                curve: null
            };
        }
        /*


            Gerçek kernel:

            
            Surface-Surface Intersection


            Plane-plane:

                line


            Plane-cylinder:

                curve


            NURBS-NURBS:

                Newton iteration


        */
        return {
            intersects: false,
            points: [],
            curve: null
        };
    }
    findCurveIntersections(face, curve) {
        const points = [];
        /*


            Curve - Surface intersection



            Gerçek implementasyon:


            Newton solver



        */
        return points;
    }
    createSplitEdges(points) {
        const edges = [];
        for (let i = 0; i < points.length - 1; i++) {
            const start = new Vertex(points[i]);
            const end = new Vertex(points[i + 1]);
            edges.push(new Edge(start, end));
        }
        return edges;
    }
    createSplitWires(face, edges) {
        const wires = [];
        if (edges.length === 0) {
            return wires;
        }
        const wire = new Wire();
        for (const edge of edges) {
            wire.addEdge(edge);
        }
        wire.close();
        wires.push(wire);
        return wires;
    }
    collectVertices(edges) {
        const vertices = [];
        for (const edge of edges) {
            if (!vertices.includes(edge.start)) {
                vertices.push(edge.start);
            }
            if (!vertices.includes(edge.end)) {
                vertices.push(edge.end);
            }
        }
        return vertices;
    }
    splitEdge(edge, parameter) {
        const point = this.interpolate(edge.start.position, edge.end.position, parameter);
        const vertex = new Vertex(point);
        return [
            new Edge(edge.start, vertex),
            new Edge(vertex, edge.end)
        ];
    }
    interpolate(a, b, t) {
        return new Point(a.x +
            (b.x - a.x)
                *
                    t, a.y +
            (b.y - a.y)
                *
                    t, a.z +
            (b.z - a.z)
                *
                    t);
    }
}
//# sourceMappingURL=Splitter.js.map