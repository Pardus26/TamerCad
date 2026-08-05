import { STLReader } from "./STLReader";
export class STLImporter {
    reader;
    fileReader;
    constructor(reader = new STLReader(), fileReader) {
        this.reader = reader;
        this.fileReader = fileReader;
    }
    async import(path, _options = {}) {
        try {
            const extension = path
                .split(".")
                .pop()
                ?.toLowerCase();
            let document;
            if (extension === "stla") {
                const result = await this.fileReader.readText(path);
                if (!result.success ||
                    !result.content) {
                    return {
                        success: false,
                        path,
                        error: result.error
                    };
                }
                document =
                    this.reader.read(result.content);
            }
            else {
                const result = await this.fileReader.readBinary(path);
                if (!result.success ||
                    !result.content) {
                    return {
                        success: false,
                        path,
                        error: result.error
                    };
                }
                document =
                    this.reader.read(result.content);
            }
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
    importFromString(asciiSTL) {
        return this.reader.read(asciiSTL);
    }
    importFromBinary(binarySTL) {
        return this.reader.read(binarySTL);
    }
}
//# sourceMappingURL=STLImporter.js.map