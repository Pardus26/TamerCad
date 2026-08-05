export class Surface {
    /**
     * Surface normal

     N = Su x Sv

     */
    normal(u, v) {
        return this
            .derivativeU(u, v)
            .cross(this.derivativeV(u, v))
            .normalize();
    }
    /**
     * Approximate closest point

     */
    closestPoint(point) {
        let closest = this.evaluate(this.uMin, this.vMin);
        let distance = closest.distanceTo(point);
        const samples = 50;
        for (let i = 0; i <= samples; i++) {
            const u = this.uMin +
                (this.uMax -
                    this.uMin)
                    *
                        i
                    /
                        samples;
            for (let j = 0; j <= samples; j++) {
                const v = this.vMin +
                    (this.vMax -
                        this.vMin)
                        *
                            j
                        /
                            samples;
                const candidate = this.evaluate(u, v);
                const d = candidate.distanceTo(point);
                if (d < distance) {
                    distance = d;
                    closest = candidate;
                }
            }
        }
        return closest;
    }
    /**
     * Projection

     */
    projectPoint(point) {
        return this.closestPoint(point);
    }
}
//# sourceMappingURL=Surface.js.map