import { HalfEdge } from "./HalfEdge";
export class Wire {
    halfEdges = [];
    constructor() { }
    addEdge(edge) {
        const halfEdge = new HalfEdge(edge, edge.start, edge.end);
        this.addHalfEdge(halfEdge);
    }
    addHalfEdge(halfEdge) {
        const last = this.halfEdges[this.halfEdges.length - 1];
        if (last) {
            last.setNext(halfEdge);
            halfEdge.setPrevious(last);
        }
        this.halfEdges.push(halfEdge);
    }
    getHalfEdges() {
        return [
            ...this.halfEdges
        ];
    }
    getEdges() {
        return this.halfEdges
            .map(he => he.edge);
    }
    getVertices() {
        const result = [];
        for (const he of this.halfEdges) {
            if (!result.includes(he.start)) {
                result.push(he.start);
            }
        }
        return result;
    }
    close() {
        if (this.halfEdges.length < 2) {
            return;
        }
        const first = this.halfEdges[0];
        const last = this.halfEdges[this.halfEdges.length - 1];
        last.setNext(first);
        first.setPrevious(last);
    }
    isClosed() {
        if (this.halfEdges.length === 0) {
            return false;
        }
        const first = this.halfEdges[0];
        const last = this.halfEdges[this.halfEdges.length - 1];
        return (last.end ===
            first.start
            &&
                last.next ===
                    first);
    }
    isValid() {
        if (this.halfEdges.length === 0) {
            return false;
        }
        for (let i = 0; i < this.halfEdges.length; i++) {
            const current = this.halfEdges[i];
            const next = this.halfEdges[i + 1];
            if (next &&
                current.end !==
                    next.start) {
                return false;
            }
        }
        return true;
    }
    length() {
        return this.getEdges()
            .reduce((sum, edge) => sum +
            edge.getLength(), 0);
    }
    containsEdge(edge) {
        return this.halfEdges
            .some(he => he.edge === edge);
    }
    removeEdge(edge) {
        const target = this.halfEdges
            .find(he => he.edge === edge);
        if (!target) {
            return;
        }
        if (target.previous) {
            target.previous.setNext(target.next);
        }
        if (target.next) {
            target.next.setPrevious(target.previous);
        }
        this.halfEdges =
            this.halfEdges
                .filter(he => he !== target);
    }
    clear() {
        this.halfEdges = [];
    }
    clone() {
        const wire = new Wire();
        for (const edge of this.getEdges()) {
            wire.addEdge(edge.clone());
        }
        if (this.isClosed()) {
            wire.close();
        }
        return wire;
    }
}
//# sourceMappingURL=Wire.js.map