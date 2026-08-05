import { Document } from "./Document";
import { Serializer } from "../serializer/Serializer";
export declare class PersistenceManager {
    private serializer;
    constructor(serializer: Serializer);
    save(document: Document): string;
    load(data: string): Document;
    export(document: Document): Uint8Array;
    import(bytes: Uint8Array): Document;
    clone(document: Document): Document;
    validate(data: string): boolean;
}
