import { Project } from "./Project";
export class ProjectLoader {
    persistence;
    reader;
    constructor(persistence, reader) {
        this.persistence = persistence;
        this.reader = reader;
    }
    async load(path) {
        try {
            const result = await this.reader.readText(path);
            if (!result.success ||
                !result.content) {
                return {
                    success: false,
                    path,
                    error: result.error
                };
            }
            const document = this.persistence.load(result.content);
            const project = new Project(document.metadata.name);
            project.addDocument(document);
            return {
                success: true,
                path,
                project
            };
        }
        catch (error) {
            return {
                success: false,
                path,
                error: error
            };
        }
    }
}
//# sourceMappingURL=ProjectLoader.js.map