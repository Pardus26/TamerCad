import { Surface } from "./Surface";
import { Point } from "../core/Point";
import { Vector3 } from "../core/Vector3";
import { BoundingBox } from "../core/BoundingBox";
export class BezierSurface extends Surface {
    controlPoints;
    constructor(controlPoints) {
        super();
        this.controlPoints = controlPoints;
        if (controlPoints.length < 2 ||
            controlPoints[0].length < 2) {
            throw new Error("Invalid Bezier control grid");
        }
    }
    get degreeU() {
        return this.controlPoints.length - 1;
    }
    get degreeV() {
        return this.controlPoints[0].length - 1;
    }
    get uMin() {
        return 0;
    }
    get uMax() {
        return 1;
    }
    get vMin() {
        return 0;
    }
    get vMax() {
        return 1;
    }
    bernstein(n, i, t) {
        const coefficient = this.binomial(n, i);
        return coefficient *
            Math.pow(t, i)
            *
                Math.pow(1 - t, n - i);
    }
    binomial(n, k) {
        let result = 1;
        for (let i = 1; i <= k; i++) {
            result *=
                (n - i + 1)
                    /
                        i;
        }
        return result;
    }
    evaluate(u, v) {
        let result = new Vector3(0, 0, 0);
        const n = this.degreeU;
        const m = this.degreeV;
        for (let i = 0; i <= n; i++) {
            for (let j = 0; j <= m; j++) {
                const weight = this.bernstein(n, i, u)
                    *
                        this.bernstein(m, j, v);
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
        return new BezierSurface(this.controlPoints
            .map(row => [
            ...row
        ]
            .reverse())
            .reverse());
    }
    transform(transform) {
        return new BezierSurface(this.controlPoints.map(row => row.map(p => transform.applyToPoint(p))));
    }
}
//# sourceMappingURL=BezierSurface.js.map