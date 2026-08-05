import { Point } from "../../../geometry/core/Point";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity, SketchEntityType } from "../SketchEntity";
export class PointEntity extends SketchEntity {
    position;
    constructor(id, position) {
        super(id, SketchEntityType.Point);
        this.position = position;
    }
    getPoints() {
        return [
            this.position
        ];
    }
    evaluate(t = 0) {
        return new Point(this.position.x, this.position.y, this.position.z);
    }
    moveTo(point) {
        this.position.x =
            point.x;
        this.position.y =
            point.y;
        this.position.z =
            point.z;
    }
    translate(vector) {
        this.position.x +=
            vector.x;
        this.position.y +=
            vector.y;
        this.position.z +=
            vector.z;
    }
    distanceTo(point) {
        const dx = this.position.x -
            point.x;
        const dy = this.position.y -
            point.y;
        const dz = this.position.z -
            point.z;
        return Math.sqrt(dx * dx +
            dy * dy +
            dz * dz);
    }
    toEdge() {
        // Point tek başına Edge oluşturmaz.
        // Kernel seviyesinde vertex olarak kullanılır.
        return new Edge(this.position, this.position);
    }
    clone() {
        return new PointEntity(this.id, new Point(this.position.x, this.position.y, this.position.z));
    }
}
//# sourceMappingURL=PointEntity.js.map