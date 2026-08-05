export class Face {
    surface;
    outerWire;
    innerWires = [];
    reversed = false;
    constructor(surface, outerWire) {
        this.surface = surface;
        this.outerWire = outerWire;
        if (!outerWire) {
            throw new Error("Face requires outer wire");
        }
    }
    addInnerWire(wire) {
        if (!this.innerWires.includes(wire)) {
            this.innerWires.push(wire);
        }
    }
    removeInnerWire(wire) {
        const index = this.innerWires.indexOf(wire);
        if (index === -1) {
            return false;
        }
        this.innerWires.splice(index, 1);
        return true;
    }
    getOuterWire() {
        return this.outerWire;
    }
    getInnerWires() {
        return [
            ...this.innerWires
        ];
    }
    getWires() {
        return [
            this.outerWire,
            ...this.innerWires
        ];
    }
    getEdges() {
        const result = [];
        for (const wire of this.getWires()) {
            for (const edge of wire.getEdges()) {
                if (!result.some(e => e.equals(edge))) {
                    result.push(edge);
                }
            }
        }
        return result;
    }
    getHalfEdges() {
        const result = [];
        for (const wire of this.getWires()) {
            result.push(...wire.getHalfEdges());
        }
        return result;
    }
    normalAt(u, v) {
        if (!this.surface) {
            return null;
        }
        const normal = this.surface.normal(u, v);
        if (this.reversed) {
            return new normal.constructor(-normal.x, -normal.y, -normal.z);
        }
        return normal;
    }
    area() {
        /*

            Face alanı surface alanı değildir.

            Trim edilmiş boundary alanıdır.



            Gerçek kernel:

            1- Wire triangulation

            2- Surface mapping

            3- Hole subtraction



            Şimdilik polygon yaklaşımı.

        */
        const vertices = this.outerWire
            .getVertices();
        if (vertices.length < 3) {
            return 0;
        }
        let area = 0;
        for (let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i]
                .position;
            const p2 = vertices[(i + 1)
                %
                    vertices.length]
                .position;
            area +=
                (p1.x *
                    p2.y)
                    -
                        (p2.x *
                            p1.y);
        }
        area =
            Math.abs(area
                /
                    2);
        // Hole alanlarını çıkar
        for (const hole of this.innerWires) {
            const holeVertices = hole.getVertices();
            let holeArea = 0;
            for (let i = 0; i < holeVertices.length; i++) {
                const p1 = holeVertices[i]
                    .position;
                const p2 = holeVertices[(i + 1)
                    %
                        holeVertices.length]
                    .position;
                holeArea +=
                    (p1.x *
                        p2.y)
                        -
                            (p2.x *
                                p1.y);
            }
            area -=
                Math.abs(holeArea / 2);
        }
        return area;
    }
    reverse() {
        const reversedSurface = this.surface
            ?
                this.surface.reverse()
            :
                null;
        const face = new Face(reversedSurface, this.outerWire.clone());
        face.outerWire.close();
        for (const wire of this.innerWires) {
            const inner = wire.clone();
            inner.close();
            face.addInnerWire(inner);
        }
        face.reversed =
            !this.reversed;
        return face;
    }
    containsEdge(edge) {
        return this.getEdges()
            .some(e => e.equals(edge));
    }
    clone() {
        const face = new Face(this.surface, this.outerWire.clone());
        for (const wire of this.innerWires) {
            face.addInnerWire(wire.clone());
        }
        face.reversed =
            this.reversed;
        return face;
    }
    isValid() {
        return (this.outerWire
            .getEdges()
            .length > 0
            &&
                this.outerWire
                    .isClosed());
    }
}
//# sourceMappingURL=Face.js.map