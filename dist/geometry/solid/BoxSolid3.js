import { Solid3 } from "./Solid3";
import { Point3 } from "../point/Point3";
import { PlaneSurface3 } from "../surface/PlaneSurface3";
import { Vector3 } from "../../math/vector/Vector3";
export class BoxSolid3 extends Solid3 {
    origin;
    width;
    height;
    depth;
    constructor(origin, width, height, depth) {
        super();
        if (width <= 0 ||
            height <= 0 ||
            depth <= 0) {
            throw new Error("Box dimensions must be positive");
        }
        this.origin =
            origin.clone();
        this.width =
            width;
        this.height =
            height;
        this.depth =
            depth;
        this.createSurfaces();
    }
    /**
     * 6 adet düzlem yüzey oluşturur
     */
    createSurfaces() {
        const o = this.origin;
        /*
            Front
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x, o.y, o.z), new Vector3(0, 0, -1)));
        /*
            Back
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x, o.y, o.z + this.depth), new Vector3(0, 0, 1)));
        /*
            Left
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x, o.y, o.z), new Vector3(-1, 0, 0)));
        /*
            Right
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x + this.width, o.y, o.z), new Vector3(1, 0, 0)));
        /*
            Bottom
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x, o.y, o.z), new Vector3(0, -1, 0)));
        /*
            Top
        */
        this.addSurface(new PlaneSurface3(new Point3(o.x, o.y + this.height, o.z), new Vector3(0, 1, 0)));
    }
    /**
     * Hacim
     */
    volume() {
        return (this.width *
            this.height *
            this.depth);
    }
    /**
     * Kütle merkezi
     */
    centerOfMass() {
        return new Point3(this.origin.x +
            this.width / 2, this.origin.y +
            this.height / 2, this.origin.z +
            this.depth / 2);
    }
    /**
     * Nokta katı içinde mi?
     */
    containsPoint(point) {
        return (point.x >= this.origin.x &&
            point.x <=
                this.origin.x +
                    this.width &&
            point.y >= this.origin.y &&
            point.y <=
                this.origin.y +
                    this.height &&
            point.z >= this.origin.z &&
            point.z <=
                this.origin.z +
                    this.depth);
    }
    /**
     * Yüzey alanı
     */
    surfaceArea() {
        return (2 *
            (this.width *
                this.height +
                this.width *
                    this.depth +
                this.height *
                    this.depth));
    }
    /**
     * Boyut güncelleme
     */
    resize(width, height, depth) {
        this.width =
            width;
        this.height =
            height;
        this.depth =
            depth;
        this.surfaces = [];
        this.createSurfaces();
    }
    type() {
        return "BoxSolid3";
    }
    clone() {
        return new BoxSolid3(this.origin.clone(), this.width, this.height, this.depth);
    }
    toString() {
        return (`BoxSolid3(` +
            `W:${this.width}, ` +
            `H:${this.height}, ` +
            `D:${this.depth}` +
            `)`);
    }
}
//# sourceMappingURL=BoxSolid3.js.map