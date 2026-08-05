import { StepWriter } from "./StepWriter";
export class StepExporter {
    writer;
    fileWriter;
    constructor(writer = new StepWriter(), fileWriter) {
        this.writer = writer;
        this.fileWriter = fileWriter;
    }
    async export(document, path, options = {}) {
        try {
            const step = this.writer.write(document);
            const result = await this.fileWriter.writeText(path, step, {
                overwrite: options.overwrite
            });
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
    exportToString(document) {
        return this.writer.write(document);
    }
}
//# sourceMappingURL=StepExporter.js.map