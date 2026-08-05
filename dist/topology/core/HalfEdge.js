export class HalfEdge {
    edge;
    start;
    end;
    next = null;
    previous = null;
    twin = null;
    constructor(edge, start, end) {
        this.edge = edge;
        this.start = start;
        this.end = end;
        if (!edge.containsVertex(start)) {
            throw new Error("HalfEdge start vertex does not belong to edge");
        }
        if (!edge.containsVertex(end)) {
            throw new Error("HalfEdge end vertex does not belong to edge");
        }
        if (start === end) {
            throw new Error("HalfEdge cannot have same start and end vertex");
        }
    }
    setNext(halfEdge) {
        this.next =
            halfEdge;
    }
    setPrevious(halfEdge) {
        this.previous =
            halfEdge;
    }
    setTwin(halfEdge) {
        this.twin =
            halfEdge;
        if (halfEdge) {
            halfEdge.twin =
                this;
        }
    }
    getStart() {
        return this.start;
    }
    getEnd() {
        return this.end;
    }
    getEdge() {
        return this.edge;
    }
    getNext() {
        return this.next;
    }
    getPrevious() {
        return this.previous;
    }
    getTwin() {
        return this.twin;
    }
    reverse() {
        this.edge.reverse();
        return new HalfEdge(this.edge, this.end, this.start);
    }
    length() {
        return this.edge.getLength();
    }
    connects(vertex) {
        return (this.start === vertex
            ||
                this.end === vertex);
    }
    isClosed() {
        return (this.start === this.end);
    }
    clone() {
        const cloned = new HalfEdge(this.edge.clone(), this.start.clone(), this.end.clone());
        return cloned;
    }
    hasTwin() {
        return this.twin !== null;
    }
    hasLoop() {
        return (this.next === this);
    }
}
//# sourceMappingURL=HalfEdge.js.map