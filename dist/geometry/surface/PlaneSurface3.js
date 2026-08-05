import { Surface3 } from "./Surface3";
import { Vector3 } from "../../math/vector/Vector3";
export class PlaneSurface3 extends Surface3 {
    origin;
    normalVector;
    uDirection;
    vDirection;
    constructor(origin, normal = new Vector3(0, 0, 1)) {
        super();
        this.origin =
            origin.clone();
        this.normalVector =
            normal.normalize();
        /*
            Plane koordinat sistemi oluşturma
        */
        let reference = new Vector3(1, 0, 0);
        if (Math.abs(this.normalVector.dot(reference)) > 0.9) {
            reference =
                new Vector3(0, 1, 0);
        }
        this.uDirection =
            this.normalVector
                .cross(reference)
                .normalize();
        this.vDirection =
            this.normalVector
                .cross(this.uDirection)
                .normalize();
    }
    /**
     * Plane parametric evaluation
     *
     * P(u,v)=O+uU+vV
     */
    evaluate(u, v) {
        const uVector = this.uDirection
            .multiply(u);
        const vVector = this.vDirection
            .multiply(v);
        return this.origin
            .add(uVector.add(vVector));
    }
    startPoint() {
        return this.origin.clone();
    }
    normal(_u, _v) {
        return new Vector3(this.normalVector.x, this.normalVector.y, this.normalVector.z);
    }
    distanceToPoint(point) {
        const vector = point.subtract(this.origin);
        return Math.abs(vector.dot(this.normalVector));
    }
    projectPoint(point) {
        const distance = point
            .subtract(this.origin)
            .dot(this.normalVector);
        return point.add(this.normalVector
            .multiply(-distance));
    }
    containsPoint(point, tolerance = 0.000001) {
        return (this.distanceToPoint(point)
            <
                tolerance);
    }
    type() {
        return "PlaneSurface3";
    }
    clone() {
        return new PlaneSurface3(this.origin.clone(), new Vector3(this.normalVector.x, this.normalVector.y, this.normalVector.z));
    }
    toString() {
        return (`PlaneSurface3(` +
            `Origin:${this.origin.toString()}, ` +
            `Normal:${this.normalVector.x},` +
            `${this.normalVector.y},` +
            `${this.normalVector.z})`);
    }
}
//# sourceMappingURL=PlaneSurface3.js.map