import { Document } from "../core/Document";
import { Serializer, SerializerFormat, SerializerMetadata } from "./Serializer";
export declare class JsonSerializer implements Serializer {
    readonly metadata: SerializerMetadata;
    serialize(document: Document): string;
    deserialize(data: string): Document;
    supports(format: SerializerFormat): boolean;
}
