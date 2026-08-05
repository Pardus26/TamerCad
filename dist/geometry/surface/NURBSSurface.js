import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class NURBSSurface extends Surface {
    controlPoints;
    weights;
    degreeU;
    degreeV;
    knotsU;
    knotsV;
    constructor(controlPoints, weights, degreeU, degreeV, knotsU, knotsV) {
        super();
        this.controlPoints = controlPoints;
        this.weights = weights;
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        if (controlPoints.length === 0 ||
            controlPoints[0].length === 0) {
            throw new Error("Invalid NURBS control grid");
        }
        if (weights.length !==
            controlPoints.length) {
            throw new Error("Weight size mismatch");
        }
    }
    get uMin() {
        return this.knotsU[this.degreeU];
    }
    get uMax() {
        return this.knotsU[this.knotsU.length -
            this.degreeU -
            1];
    }
    get vMin() {
        return this.knotsV[this.degreeV];
    }
    get vMax() {
        return this.knotsV[this.knotsV.length -
            this.degreeV -
            1];
    }
    basis(i, degree, knots, t) {
        if (degree === 0) {
            return (knots[i] <= t &&
                t < knots[i + 1])
                ?
                    1
                :
                    0;
        }
        let a = 0;
        let b = 0;
        const d1 = knots[i + degree]
            -
                knots[i];
        const d2 = knots[i + degree + 1]
            -
                knots[i + 1];
        if (d1 !== 0) {
            a =
                (t - knots[i])
                    /
                        d1
                    *
                        this.basis(i, degree - 1, knots, t);
        }
        if (d2 !== 0) {
            b =
                (knots[i + degree + 1]
                    -
                        t)
                    /
                        d2
                    *
                        this.basis(i + 1, degree - 1, knots, t);
        }
        return a + b;
    }
    evaluate(u, v) {
        let numerator = new Vector3(0, 0, 0);
        let denominator = 0;
        for (let i = 0; i < this.controlPoints.length; i++) {
            const Nu = this.basis(i, this.degreeU, this.knotsU, u);
            for (let j = 0; j < this.controlPoints[i].length; j++) {
                const Nv = this.basis(j, this.degreeV, this.knotsV, v);
                const w = this.weights[i][j];
                const factor = Nu *
                    Nv *
                    w;
                numerator =
                    numerator.add(this.controlPoints[i][j]
                        .toVector()
                        .multiply(factor));
                denominator +=
                    factor;
            }
        }
        if (denominator === 0) {
            throw new Error("Invalid NURBS evaluation");
        }
        return new Point(numerator.x /
            denominator, numerator.y /
            denominator, numerator.z /
            denominator);
    }
    derivativeU(u, v) {
        const eps = 1e-6;
        return this.evaluate(u + eps, v)
            .subtract(this.evaluate(u, v))
            .toVector()
            .multiply(1 / eps);
    }
    derivativeV(u, v) {
        const eps = 1e-6;
        return this.evaluate(u, v + eps)
            .subtract(this.evaluate(u, v))
            .toVector()
            .multiply(1 / eps);
    }
    boundingBox() {
        const box = BoundingBox.empty();
        for (const row of this.controlPoints) {
            for (const point of row) {
                box.expand(point);
            }
        }
        return box;
    }
    reverse() {
        return new NURBSSurface(this.controlPoints
            .map(r => [
            ...r
        ]
            .reverse())
            .reverse(), this.weights
            .map(r => [
            ...r
        ]
            .reverse())
            .reverse(), this.degreeU, this.degreeV, this.knotsU, this.knotsV);
    }
    transform(transform) {
        return new NURBSSurface(this.controlPoints.map(row => row.map(p => transform.applyToPoint(p))), this.weights, this.degreeU, this.degreeV, this.knotsU, this.knotsV);
    }
}
//# sourceMappingURL=NURBSSurface.js.map