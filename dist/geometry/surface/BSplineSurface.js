import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class BSplineSurface extends Surface {
    controlPoints;
    degreeU;
    degreeV;
    knotsU;
    knotsV;
    constructor(controlPoints, degreeU, degreeV, knotsU, knotsV) {
        super();
        this.controlPoints = controlPoints;
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.knotsU = knotsU;
        this.knotsV = knotsV;
        if (controlPoints.length === 0 ||
            controlPoints[0].length === 0) {
            throw new Error("Empty BSpline surface");
        }
    }
    get uMin() {
        return this.knotsU[this.degreeU];
    }
    get uMax() {
        return this.knotsU[this.knotsU.length
            -
                this.degreeU
            -
                1];
    }
    get vMin() {
        return this.knotsV[this.degreeV];
    }
    get vMax() {
        return this.knotsV[this.knotsV.length
            -
                this.degreeV
            -
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
        let left = 0;
        let right = 0;
        const leftDenom = knots[i + degree]
            -
                knots[i];
        const rightDenom = knots[i + degree + 1]
            -
                knots[i + 1];
        if (leftDenom !== 0) {
            left =
                (t - knots[i])
                    /
                        leftDenom
                    *
                        this.basis(i, degree - 1, knots, t);
        }
        if (rightDenom !== 0) {
            right =
                (knots[i + degree + 1]
                    -
                        t)
                    /
                        rightDenom
                    *
                        this.basis(i + 1, degree - 1, knots, t);
        }
        return left + right;
    }
    evaluate(u, v) {
        let result = new Vector3(0, 0, 0);
        const countU = this.controlPoints.length;
        const countV = this.controlPoints[0].length;
        for (let i = 0; i < countU; i++) {
            const Nu = this.basis(i, this.degreeU, this.knotsU, u);
            for (let j = 0; j < countV; j++) {
                const Nv = this.basis(j, this.degreeV, this.knotsV, v);
                const weight = Nu * Nv;
                result =
                    result.add(this.controlPoints[i][j]
                        .toVector()
                        .multiply(weight));
            }
        }
        return new Point(result.x, result.y, result.z);
    }
    derivativeU(u, v) {
        const delta = 0.000001;
        return this.evaluate(u + delta, v)
            .subtract(this.evaluate(u, v))
            .toVector()
            .multiply(1 / delta);
    }
    derivativeV(u, v) {
        const delta = 0.000001;
        return this.evaluate(u, v + delta)
            .subtract(this.evaluate(u, v))
            .toVector()
            .multiply(1 / delta);
    }
    boundingBox() {
        const box = BoundingBox.empty();
        for (const row of this.controlPoints) {
            for (const p of row) {
                box.expand(p);
            }
        }
        return box;
    }
    reverse() {
        return new BSplineSurface(this.controlPoints
            .map(row => [
            ...row
        ]
            .reverse())
            .reverse(), this.degreeU, this.degreeV, this.knotsU, this.knotsV);
    }
    transform(transform) {
        return new BSplineSurface(this.controlPoints.map(row => row.map(p => transform.applyToPoint(p))), this.degreeU, this.degreeV, this.knotsU, this.knotsV);
    }
}
//# sourceMappingURL=BSplineSurface.js.map