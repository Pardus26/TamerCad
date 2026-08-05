import { Point3 } from "../point/Point3";
export class MeshVertex {
    /**
     * Vertex unique identifier
     */
    id;
    /**
     * Position
     */
    position;
    /**
     * Optional normal index
     */
    normalIndex = null;
    /**
     * Optional texture coordinate index
     */
    uvIndex = null;
    /**
     * Optional vertex color
     */
    color;
    constructor(id, position) {
        this.id = id;
        this.position =
            position.clone();
    }
    /**
     * Position değiştirme
     */
    setPosition(position) {
        this.position =
            position.clone();
    }
    /**
     * Vertex taşıma
     */
    translate(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    }
    /**
     * Clone
     */
    clone() {
        const vertex = new MeshVertex(MeshVertex.generateId(), this.position);
        vertex.normalIndex =
            this.normalIndex;
        vertex.uvIndex =
            this.uvIndex;
        if (this.color) {
            vertex.color = {
                ...this.color
            };
        }
        return vertex;
    }
    /**
     * Geometrik eşitlik
     */
    equals(other, tolerance = 1e-9) {
        return (Math.abs(this.position.x -
            other.position.x)
            <= tolerance
            &&
                Math.abs(this.position.y -
                    other.position.y)
                    <= tolerance
            &&
                Math.abs(this.position.z -
                    other.position.z)
                    <= tolerance);
    }
    /**
     * Mesafe
     */
    distanceTo(other) {
        return this.position.distanceTo(other.position);
    }
    /**
     * JSON
     */
    toJSON() {
        return {
            id: this.id,
            position: {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z
            },
            normalIndex: this.normalIndex,
            uvIndex: this.uvIndex,
            color: this.color
        };
    }
    /**
     * JSON yükleme
     */
    static fromJSON(data) {
        const positionData = data.position ??
            data;
        const vertex = new MeshVertex(data.id ??
            MeshVertex.generateId(), new Point3(positionData.x, positionData.y, positionData.z));
        vertex.normalIndex =
            data.normalIndex ??
                null;
        vertex.uvIndex =
            data.uvIndex ??
                null;
        vertex.color =
            data.color;
        return vertex;
    }
    static generateId() {
        return (Date.now()
            +
                Math.floor(Math.random() * 1000000));
    }
}
//# sourceMappingURL=MeshVertex.js.map