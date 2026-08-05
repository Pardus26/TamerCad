export var EdgeMatchType;
(function (EdgeMatchType) {
    EdgeMatchType["None"] = "None";
    EdgeMatchType["SameDirection"] = "SameDirection";
    EdgeMatchType["OppositeDirection"] = "OppositeDirection";
})(EdgeMatchType || (EdgeMatchType = {}));
export class EdgeMatcher {
    tolerance;
    constructor(tolerance = 1e-6) {
        this.tolerance = tolerance;
    }
    match(edgeA, edgeB) {
        const distance = this.edgeDistance(edgeA, edgeB);
        if (distance >
            this.tolerance) {
            return {
                matched: false,
                type: EdgeMatchType.None,
                distance
            };
        }
        if (this.sameGeometry(edgeA, edgeB)) {
            return {
                matched: true,
                type: EdgeMatchType.SameDirection,
                distance
            };
        }
        if (this.oppositeGeometry(edgeA, edgeB)) {
            return {
                matched: true,
                type: EdgeMatchType.OppositeDirection,
                distance
            };
        }
        return {
            matched: false,
            type: EdgeMatchType.None,
            distance
        };
    }
    equals(a, b) {
        return this.match(a, b)
            .matched;
    }
    sameDirection(a, b) {
        return (this.match(a, b)
            .type
            ===
                EdgeMatchType.SameDirection);
    }
    oppositeDirection(a, b) {
        return (this.match(a, b)
            .type
            ===
                EdgeMatchType.OppositeDirection);
    }
    sameGeometry(a, b) {
        return (this.sameVertex(a.start, b.start)
            &&
                this.sameVertex(a.end, b.end)
            &&
                this.sameCurve(a, b));
    }
    oppositeGeometry(a, b) {
        return (this.sameVertex(a.start, b.end)
            &&
                this.sameVertex(a.end, b.start)
            &&
                this.sameCurve(a, b));
    }
    sameVertex(a, b) {
        if (a === b) {
            return true;
        }
        return (a.position.distanceTo(b.position)
            <=
                this.tolerance);
    }
    sameCurve(a, b) {
        const ca = a.getCurve();
        const cb = b.getCurve();
        if (!ca && !cb) {
            return true;
        }
        if (!ca || !cb) {
            return false;
        }
        if (ca === cb) {
            return true;
        }
        /*

            Curve karşılaştırma

            ileride:

            - LineCurve

            - CircleCurve

            - ArcCurve

            - NurbsCurve

            karşılaştırmaları eklenebilir.

        */
        return false;
    }
    edgeDistance(a, b) {
        const direct = a.start.position.distanceTo(b.start.position)
            +
                a.end.position.distanceTo(b.end.position);
        const reverse = a.start.position.distanceTo(b.end.position)
            +
                a.end.position.distanceTo(b.start.position);
        return Math.min(direct, reverse);
    }
    findMatches(edge, edges) {
        return edges.filter(e => this.equals(edge, e));
    }
    findOpposite(edge, candidates) {
        for (const candidate of candidates) {
            if (this.oppositeDirection(edge, candidate)) {
                return candidate;
            }
        }
        return null;
    }
    findSameDirection(edge, candidates) {
        for (const candidate of candidates) {
            if (this.sameDirection(edge, candidate)) {
                return candidate;
            }
        }
        return null;
    }
}
//# sourceMappingURL=EdgeMatcher.js.map