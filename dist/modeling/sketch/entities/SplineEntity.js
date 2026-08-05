import { Point } from "../../../geometry/core/Point";
import { Edge } from "../../../topology/core/Edge";
import { SketchEntity, SketchEntityType } from "../SketchEntity";
export class SplineEntity extends SketchEntity {
    controlPoints;
    degree;
    knots;
    constructor(id, controlPoints, degree = 3, knots = []) {
        super(id, SketchEntityType.BSpline);
        this.controlPoints = controlPoints;
        this.degree = degree;
        this.knots = knots;
        if (this.knots.length === 0) {
            this.generateUniformKnots();
        }
    }
    getPoints() {
        return this.controlPoints;
    }
    evaluate(u) {
        if (u < 0 ||
            u > 1) {
            throw new Error("Spline parameter must be between 0 and 1");
        }
        const n = this.controlPoints.length;
        let x = 0;
        let y = 0;
        let z = 0;
        let weight = 0;
        for (let i = 0; i < n; i++) {
            const basis = this.basisFunction(i, this.degree, u);
            x +=
                this.controlPoints[i].x
                    *
                        basis;
            y +=
                this.controlPoints[i].y
                    *
                        basis;
            z +=
                this.controlPoints[i].z
                    *
                        basis;
            weight += basis;
        }
        if (weight !== 0) {
            x /= weight;
            y /= weight;
            z /= weight;
        }
        return new Point(x, y, z);
    }
    length(samples = 50) {
        let total = 0;
        let previous = this.evaluate(0);
        for (let i = 1; i <= samples; i++) {
            const current = this.evaluate(i / samples);
            const dx = current.x -
                previous.x;
            const dy = current.y -
                previous.y;
            const dz = current.z -
                previous.z;
            total +=
                Math.sqrt(dx * dx +
                    dy * dy +
                    dz * dz);
            previous =
                current;
        }
        return total;
    }
    translate(vector) {
        for (const p of this.controlPoints) {
            p.x += vector.x;
            p.y += vector.y;
            p.z += vector.z;
        }
    }
    reverse() {
        this.controlPoints.reverse();
        this.knots.reverse();
    }
    toEdge() {
        return new Edge(this.controlPoints[0], this.controlPoints[this.controlPoints.length - 1]);
    }
    clone() {
        return new SplineEntity(this.id, this.controlPoints.map(p => new Point(p.x, p.y, p.z)), this.degree, [...this.knots]);
    }
    generateUniformKnots() {
        const count = this.controlPoints.length
            +
                this.degree
            +
                1;
        for (let i = 0; i < count; i++) {
            this.knots.push(i /
                (count - 1));
        }
    }
    basisFunction(i, degree, u) {
        if (degree === 0) {
            return (this.knots[i] <= u &&
                u < this.knots[i + 1])
                ?
                    1
                :
                    0;
        }
        const leftDenominator = this.knots[i + degree]
            -
                this.knots[i];
        const rightDenominator = this.knots[i + degree + 1]
            -
                this.knots[i + 1];
        let result = 0;
        if (leftDenominator !== 0) {
            result +=
                (u - this.knots[i])
                    /
                        leftDenominator
                    *
                        this.basisFunction(i, degree - 1, u);
        }
        if (rightDenominator !== 0) {
            result +=
                (this.knots[i + degree + 1]
                    -
                        u)
                    /
                        rightDenominator
                    *
                        this.basisFunction(i + 1, degree - 1, u);
        }
        return result;
    }
}
//# sourceMappingURL=SplineEntity.js.map