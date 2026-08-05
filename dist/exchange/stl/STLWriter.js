import { STLAsciiWriter } from "./STLAsciiWriter";
import { STLBinaryWriter } from "./STLBinaryWriter";
export class STLWriter {
    asciiWriter = new STLAsciiWriter();
    binaryWriter = new STLBinaryWriter();
    write(body, options = {}) {
        const format = options.format ?? "ascii";
        switch (format) {
            case "ascii":
                return this.asciiWriter.write(body, {
                    solidName: options.solidName
                });
            case "binary":
                return this.binaryWriter.write(body, {
                    solidName: options.solidName
                });
            default:
                throw new Error(`Unsupported STL format: ${format}`);
        }
    }
}
//# sourceMappingURL=STLWriter.js.map