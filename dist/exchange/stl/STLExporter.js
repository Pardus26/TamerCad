import { STLWriter } from "./STLWriter";
export class STLExporter {
    writer;
    fileWriter;
    constructor(writer = new STLWriter(), fileWriter) {
        this.writer = writer;
        this.fileWriter = fileWriter;
    }
    async export(body, path, options = {}) {
        try {
            const format = options.format ??
                "ascii";
            const output = this.writer.write(body, {
                format,
                solidName: options.solidName
            });
            if (typeof output === "string") {
                const result = await this.fileWriter.writeText(path, output, {
                    overwrite: options.overwrite
                });
                return {
                    success: result.success,
                    path: result.path,
                    bytesWritten: result.bytesWritten,
                    error: result.error
                };
            }
            const result = await this.fileWriter.writeBinary(path, output, {
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
    exportToString(body) {
        return this.writer.write(body, {
            format: "ascii"
        });
    }
    exportToBinary(body) {
        return this.writer.write(body, {
            format: "binary"
        });
    }
}
//# sourceMappingURL=STLExporter.js.map