export class PersistenceManager {
    serializer;
    constructor(serializer) {
        this.serializer = serializer;
    }
    save(document) {
        document.touch();
        return this.serializer.serialize(document);
    }
    load(data) {
        return this.serializer.deserialize(data);
    }
    export(document) {
        const text = this.save(document);
        return new TextEncoder()
            .encode(text);
    }
    import(bytes) {
        const text = new TextDecoder()
            .decode(bytes);
        return this.load(text);
    }
    clone(document) {
        const serialized = this.save(document);
        return this.load(serialized);
    }
    validate(data) {
        try {
            this.load(data);
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=PersistenceManager.js.map