import { Document } from "../core/Document";
import { Serializer, SerializerFormat, SerializerMetadata } from "./Serializer";
import { StepReader } from "../../exchange/step/StepReader";
import { StepWriter } from "../../exchange/step/StepWriter";
export declare class StepSerializer implements Serializer {
    private readonly reader;
    private readonly writer;
    readonly metadata: SerializerMetadata;
    constructor(reader?: StepReader, writer?: StepWriter);
    serialize(document: Document): string;
    deserialize(data: string): Document;
    supports(format: SerializerFormat): boolean;
}
