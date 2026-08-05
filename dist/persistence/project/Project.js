export class Project {
    metadata;
    settings;
    documents = new Map();
    activeDocumentId = null;
    properties = new Map();
    constructor(name) {
        this.metadata = {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date(),
            modifiedAt: new Date(),
            version: "1.0.0"
        };
        this.settings = {
            autoSave: true,
            autoSaveInterval: 300,
            defaultLengthUnit: "mm",
            defaultAngleUnit: "deg"
        };
    }
    addDocument(document) {
        this.documents.set(document.metadata.id, document);
        if (this.activeDocumentId === null) {
            this.activeDocumentId =
                document.metadata.id;
        }
        this.touch();
    }
    removeDocument(id) {
        const removed = this.documents.delete(id);
        if (this.activeDocumentId === id) {
            this.activeDocumentId =
                this.documents.size > 0
                    ? Array.from(this.documents.keys())[0]
                    : null;
        }
        if (removed) {
            this.touch();
        }
        return removed;
    }
    getDocument(id) {
        return (this.documents.get(id)
            ??
                null);
    }
    getDocuments() {
        return Array.from(this.documents.values());
    }
    getActiveDocument() {
        if (!this.activeDocumentId) {
            return null;
        }
        return this.getDocument(this.activeDocumentId);
    }
    setActiveDocument(id) {
        if (!this.documents.has(id)) {
            return false;
        }
        this.activeDocumentId = id;
        this.touch();
        return true;
    }
    setProperty(key, value) {
        this.properties.set(key, value);
        this.touch();
    }
    getProperty(key) {
        return this.properties.get(key);
    }
    getProperties() {
        return Object.fromEntries(this.properties);
    }
    touch() {
        this.metadata.modifiedAt =
            new Date();
    }
    toJSON() {
        return {
            metadata: this.metadata,
            settings: this.settings,
            activeDocumentId: this.activeDocumentId,
            documents: this.getDocuments()
                .map(doc => doc.toJSON()),
            properties: this.getProperties()
        };
    }
}
//# sourceMappingURL=Project.js.map