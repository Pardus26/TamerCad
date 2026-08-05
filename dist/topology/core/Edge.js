export class Edge {
    start;
    end;
    curve = null;
    reversed = false;
    valid = true;
    constructor(start, end, curve = null) {
        this.start = start;
        this.end = end;
        this.curve =
            curve;
        this.start.addEdge(this);
        this.end.addEdge(this);
    }
    getStartVertex() {
        return this.start;
    }
    getEndVertex() {
        return this.end;
    }
    getLength() {
        if (this.curve) {
            return this.curve.length();
        }
        return this.start.position
            .distanceTo(this.end.position);
    }
    getCurve() {
        return this.curve;
    }
    setCurve(curve) {
        this.curve =
            curve;
        this.invalidate();
    }
    reverse() {
        const temp = this.start;
        this.start =
            this.end;
        this.end =
            temp;
        this.reversed =
            !this.reversed;
        this.invalidate();
    }
    getDirection() {
        const dx = this.end.position.x -
            this.start.position.x;
        const dy = this.end.position.y -
            this.start.position.y;
        const dz = this.end.position.z -
            this.start.position.z;
        const length = Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
        if (length === 0) {
            return {
                x: 0,
                y: 0,
                z: 0
            };
        }
        return {
            x: dx / length,
            y: dy / length,
            z: dz / length
        };
    }
    containsVertex(vertex) {
        return (this.start === vertex
            ||
                this.end === vertex);
    }
    otherVertex(vertex) {
        if (this.start === vertex) {
            return this.end;
        }
        if (this.end === vertex) {
            return this.start;
        }
        return null;
    }
    equals(edge, tolerance = 1e-6) {
        return ((this.start.equals(edge.start, tolerance)
            &&
                this.end.equals(edge.end, tolerance))
            ||
                (this.start.equals(edge.end, tolerance)
                    &&
                        this.end.equals(edge.start, tolerance)));
    }
    clone() {
        return new Edge(this.start.clone(), this.end.clone(), this.curve);
    }
    invalidate() {
        this.valid =
            false;
    }
    isValid() {
        return this.valid;
    }
    remove() {
        this.start.removeEdge(this);
        this.end.removeEdge(this);
        this.valid =
            false;
    }
}
//# sourceMappingURL=Edge.js.map