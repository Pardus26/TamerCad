import { Document } from "../../persistence/core/Document";
export class STLMeshConverter {
    convert(triangles) {
        const document = new Document("Imported STL");
        document.metadata = {
            ...document.metadata,
            sourceFormat: "STL",
            triangleCount: triangles.length,
            mesh: {
                triangles
            }
        };
        return document;
    }
}
//# sourceMappingURL=STLMeshConverter.js.map