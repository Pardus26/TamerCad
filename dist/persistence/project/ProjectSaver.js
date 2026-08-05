export class ProjectSaver {
    persistence;
    writer;
    constructor(persistence, writer) {
        this.persistence = persistence;
        this.writer = writer;
    }
    async save(project, path) {
        try {
            project.touch();
            const json = this.persistence.save(project.getActiveDocument());
            const result = await this.writer.writeText(path, json);
            return {
                success: result.success,
                path: result.path,
                bytesWritten: result.bytesWritten,
                error: result.error
            };
        }
        catch (error) {
            return {
                success: false,
                path,
                bytesWritten: 0,
                error: error
            };
        }
    }
    async saveCopy(project, path) {
        return this.save(project, path);
    }
}
//# sourceMappingURL=ProjectSaver.js.map