import { Point } from "../../geometry/core/Point";
export class Vertex {
    position;
    edges = [];
    constructor(position) {
        this.position = position;
    }
    addEdge(edge) {
        if (!this.edges.includes(edge)) {
            this.edges.push(edge);
        }
    }
    removeEdge(edge) {
        const index = this.edges.indexOf(edge);
        if (index !== -1) {
            this.edges.splice(index, 1);
        }
    }
    getEdges() {
        return [
            ...this.edges
        ];
    }
    degree() {
        return this.edges.length;
    }
    distanceTo(vertex) {
        return this.position
            .distanceTo(vertex.position);
    }
    equals(vertex, tolerance = 1e-6) {
        return (this.distanceTo(vertex)
            <= tolerance);
    }
    clone() {
        return new Vertex(new Point(this.position.x, this.position.y, this.position.z));
    }
    translate(vector) {
        return new Vertex(new Point(this.position.x +
            vector.x, this.position.y +
            vector.y, this.position.z +
            vector.z));
    }
    setPosition(point) {
        this.position =
            point;
        for (const edge of this.edges) {
            edge.invalidate?.();
        }
    }
    getPosition() {
        return this.position;
    }
}
//# sourceMappingURL=Vertex.js.map