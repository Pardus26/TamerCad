import { Vector3 } from "../../geometry/core/Vector3";
import { BRepBuilder } from "../../topology/brep/BRepBuilder";
export class Draft {
    solid;
    faces;
    angle;
    neutralPlane;
    options;
    draftDirection;
    constructor(solid, faces, angle, neutralPlane, options = {}) {
        this.solid = solid;
        this.faces = faces;
        this.angle = angle;
        this.neutralPlane = neutralPlane;
        this.options = options;
        if (angle === 0) {
            throw new Error("Draft angle cannot be zero");
        }
        if (angle <= -Math.PI ||
            angle >= Math.PI) {
            throw new Error("Draft angle must be between -PI and PI");
        }
        if (faces.length === 0) {
            throw new Error("Draft requires at least one face");
        }
        if (options.direction) {
            this.draftDirection =
                this.normalize(options.direction);
        }
    }
    build() {
        const builder = new BRepBuilder();
        const resultFaces = [];
        for (const face of this.solid.getFaces()) {
            if (this.isDraftFace(face)) {
                resultFaces.push(this.applyDraft(face));
            }
            else {
                resultFaces.push(face);
            }
        }
        const shell = builder.createShell(resultFaces);
        return builder.createSolid(shell);
    }
    isDraftFace(face) {
        return this.faces
            .includes(face);
    }
    applyDraft(face) {
        /*


            Gerçek CAD kernel aşaması:


            1- Face surface alınır


            2- Neutral plane referansı hesaplanır


            3- Draft direction belirlenir


            4- Angle kadar taper uygulanır


            5- Yeni surface oluşturulur


            6- Face trim edilir


            7- Topology yeniden bağlanır



            Şimdilik topology korunur.


        */
        return face;
    }
    normalize(vector) {
        const length = Math.sqrt(vector.x * vector.x +
            vector.y * vector.y +
            vector.z * vector.z);
        if (length === 0) {
            throw new Error("Draft direction cannot be zero");
        }
        return new Vector3(vector.x /
            length, vector.y /
            length, vector.z /
            length);
    }
    getAngle() {
        return this.angle;
    }
    getNeutralPlane() {
        return this.neutralPlane;
    }
    getFaces() {
        return this.faces;
    }
    getDirection() {
        return this.draftDirection;
    }
    preserveTopology() {
        return (this.options.preserveTopology !== false);
    }
}
//# sourceMappingURL=Draft.js.map