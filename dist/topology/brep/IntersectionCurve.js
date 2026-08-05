import { Point } from "../../geometry/core/Point";
import { Edge } from "../core/Edge";
import { Vertex } from "../core/Vertex";
export var IntersectionType;
(function (IntersectionType) {
    IntersectionType["CURVE"] = "curve";
    IntersectionType["LINE"] = "line";
    IntersectionType["POINT"] = "point";
    IntersectionType["NONE"] = "none";
})(IntersectionType || (IntersectionType = {}));
export class IntersectionCurve {
    faceA;
    faceB;
    curve;
    samples = [];
    type = IntersectionType.CURVE;
    constructor(faceA, faceB, curve = null) {
        this.faceA = faceA;
        this.faceB = faceB;
        this.curve = curve;
        if (!faceA
            ||
                !faceB) {
            throw new Error("IntersectionCurve requires two faces");
        }
    }
    evaluate(t) {
        if (!this.curve) {
            return this.interpolateSamples(t);
        }
        return this.curve.evaluate(t);
    }
    tangent(t) {
        if (!this.curve) {
            return null;
        }
        return this.curve.tangent(t);
    }
    addSample(parameter, point) {
        this.samples.push({
            parameter,
            point
        });
    }
    getSamples() {
        return [
            ...this.samples
        ];
    }
    startPoint() {
        if (this.samples.length === 0) {
            return null;
        }
        return this.samples[0].point;
    }
    endPoint() {
        if (this.samples.length === 0) {
            return null;
        }
        return this.samples[this.samples.length - 1]
            .point;
    }
    length() {
        if (this.curve) {
            return this.curve.length();
        }
        let total = 0;
        for (let i = 1; i < this.samples.length; i++) {
            total +=
                this.samples[i - 1]
                    .point
                    .distanceTo(this.samples[i].point);
        }
        return total;
    }
    toEdge() {
        const start = this.startPoint();
        const end = this.endPoint();
        if (!start
            ||
                !end) {
            return null;
        }
        const startVertex = new Vertex(start);
        const endVertex = new Vertex(end);
        return new Edge(startVertex, endVertex, this.curve);
    }
    reverse() {
        const reversed = new IntersectionCurve(this.faceB, this.faceA, this.curve);
        reversed.type =
            this.type;
        reversed.samples =
            [
                ...this.samples
            ]
                .reverse()
                .map(sample => ({
                parameter: 1 -
                    sample.parameter,
                point: sample.point.clone()
            }));
        return reversed;
    }
    isValid() {
        return (this.faceA !== null
            &&
                this.faceB !== null
            &&
                (this.curve !== null
                    ||
                        this.samples.length >= 2));
    }
    interpolateSamples(t) {
        if (this.samples.length === 0) {
            return null;
        }
        if (this.samples.length === 1) {
            return this.samples[0]
                .point
                .clone();
        }
        let previous = this.samples[0];
        for (let i = 1; i < this.samples.length; i++) {
            const current = this.samples[i];
            if (t <= current.parameter) {
                const local = (t -
                    previous.parameter)
                    /
                        (current.parameter -
                            previous.parameter);
                return new Point(previous.point.x +
                    (current.point.x -
                        previous.point.x)
                        *
                            local, previous.point.y +
                    (current.point.y -
                        previous.point.y)
                        *
                            local, previous.point.z +
                    (current.point.z -
                        previous.point.z)
                        *
                            local);
            }
            previous =
                current;
        }
        return this.samples[this.samples.length - 1]
            .point
            .clone();
    }
}
//# sourceMappingURL=IntersectionCurve.js.map