import { Document } from "../core/Document";
import { SerializerFormat } from "./Serializer";
export class JsonSerializer {
    metadata = {
        format: SerializerFormat.JSON,
        version: "1.0.0",
        mimeType: "application/json",
        extension: ".fcad"
    };
    serialize(document) {
        return JSON.stringify(document.toJSON(), null, 2);
    }
    deserialize(data) {
        const json = JSON.parse(data);
        const document = new Document(json.metadata?.name ??
            "Untitled");
        // Metadata
        if (json.metadata) {
            Object.assign(document.metadata, {
                author: json.metadata.author,
                company: json.metadata.company,
                description: json.metadata.description,
                version: json.metadata.version,
                createdAt: new Date(json.metadata.createdAt),
                modifiedAt: new Date(json.metadata.modifiedAt)
            });
        }
        // Units
        if (json.units) {
            document.units.length =
                json.units.length;
            document.units.angle =
                json.units.angle;
        }
        // Custom Properties
        if (json.properties) {
            for (const key of Object.keys(json.properties)) {
                document.setProperty(key, json.properties[key]);
            }
        }
        return document;
    }
    supports(format) {
        return (format ===
            SerializerFormat.JSON);
    }
}
//# sourceMappingURL=JsonSerializer.js.map