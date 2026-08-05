import { StepReader } from "./StepReader";
export class StepImporter {
    reader;
    fileReader;
    constructor(reader = new StepReader(), fileReader) {
        this.reader = reader;
        this.fileReader = fileReader;
    }
    async import(path, options = {}) {
        try {
            const result = await this.fileReader.readText(path);
            if (!result.success ||
                !result.content) {
                return {
                    success: false,
                    path,
                    error: result.error
                };
            }
            const document = this.reader.read(result.content);
            // Gelecekte:
            //
            // Topology repair
            //
            // Merge
            //
            // Healing
            //
            // Unit conversion
            return {
                success: true,
                path,
                document
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
    importFromString(step) {
        return this.reader.read(step);
    }
}
//# sourceMappingURL=StepImporter.js.map