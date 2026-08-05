import { Mesh } from "./Mesh";
import { MeshBody } from "./MeshBody";
export class MeshSerializer {
    static VERSION = 1;
    serializeMesh(mesh, pretty = true) {
        const data = {
            version: MeshSerializer.VERSION,
            mesh: mesh.toJSON()
        };
        return pretty
            ? JSON.stringify(data, null, 4)
            : JSON.stringify(data);
    }
    deserializeMesh(json) {
        const data = JSON.parse(json);
        this.checkVersion(data.version);
        return Mesh.fromJSON(data.mesh);
    }
    serializeBody(body, pretty = true) {
        const data = {
            version: MeshSerializer.VERSION,
            body: body.toJSON()
        };
        return pretty
            ? JSON.stringify(data, null, 4)
            : JSON.stringify(data);
    }
    deserializeBody(json) {
        const data = JSON.parse(json);
        this.checkVersion(data.version);
        return MeshBody.fromJSON(data.body);
    }
    toObject(mesh) {
        return {
            version: MeshSerializer.VERSION,
            mesh: mesh.toJSON()
        };
    }
    fromObject(object) {
        this.checkVersion(object.version);
        return Mesh.fromJSON(object.mesh);
    }
    checkVersion(version) {
        if (version >
            MeshSerializer.VERSION) {
            throw new Error(`Unsupported mesh serialization version ${version}.`);
        }
    }
}
//# sourceMappingURL=MeshSerializer.js.map