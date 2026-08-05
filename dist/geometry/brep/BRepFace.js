import { Tessellator3 } from "../mesh/Tessellator3";
export class BRepFace {
    id;
    /**
     * Geometrik yüzey
     */
    surface;
    /**
     * Dış sınır
     */
    outerLoop;
    /**
     * Delik loopları
     */
    innerLoops;
    /**
     * Yüz yönü
     */
    reversed;
    /**
     * Metadata
     */
    metadata;
    constructor(surface, outerLoop) {
        this.id =
            crypto.randomUUID();
        this.surface =
            surface;
        this.outerLoop =
            outerLoop;
        this.innerLoops =
            [];
        this.reversed =
            false;
        this.metadata =
            {};
    }
    /**
     * İç loop ekleme
     */
    addInnerLoop(loop) {
        this.innerLoops.push(loop);
    }
    /**
     * İç loop silme
     */
    removeInnerLoop(index) {
        this.innerLoops.splice(index, 1);
    }
    /**
     * Loop sayısı
     */
    loopCount() {
        return (1 +
            this.innerLoops.length);
    }
    /**
     * Yüz ters çevirme
     */
    reverse() {
        this.reversed =
            !this.reversed;
        this.outerLoop
            .reverse();
        for (const loop of this.innerLoops) {
            loop.reverse();
        }
    }
    /**
     * Yaklaşık alan hesabı
     */
    area() {
        const mesh = this.tessellate();
        return mesh.area();
    }
    /**
     * Mesh üretimi
     */
    tessellate() {
        return Tessellator3
            .production({
            getSurfaces: () => [
                this.surface
            ]
        });
    }
    /**
     * Yüz geçerli mi
     */
    isValid() {
        return (this.surface !== undefined
            &&
                this.outerLoop.isValid());
    }
    /**
     * Nokta yüz üzerinde mi
     */
    containsPoint(point) {
        return this.surface
            .containsPoint(point);
    }
    /**
     * Clone
     */
    clone() {
        const face = new BRepFace(this.surface.clone(), this.outerLoop.clone());
        face.innerLoops =
            this.innerLoops.map(loop => loop.clone());
        face.reversed =
            this.reversed;
        face.metadata =
            {
                ...this.metadata
            };
        return face;
    }
    /**
     * JSON export
     */
    toJSON() {
        return {
            id: this.id,
            outerLoop: this.outerLoop.id,
            innerLoops: this.innerLoops.map(l => l.id),
            reversed: this.reversed
        };
    }
    toString() {
        return (`BRepFace(` +
            `Loops:${this.loopCount()}, ` +
            `Reversed:${this.reversed}` +
            `)`);
    }
}
//# sourceMappingURL=BRepFace.js.map