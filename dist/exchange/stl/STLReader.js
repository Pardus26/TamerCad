import { STLAsciiReader } from "./STLAsciiReader";
import { STLBinaryReader } from "./STLBinaryReader";
import { STLMeshConverter } from "./STLMeshConverter";
export class STLReader {
    asciiReader = new STLAsciiReader();
    binaryReader = new STLBinaryReader();
    converter = new STLMeshConverter();
    read(data) {
        const triangles = typeof data === "string"
            ? this.asciiReader.read(data)
            : this.binaryReader.read(data);
        return this.converter.convert(triangles);
    }
}
//# sourceMappingURL=STLReader.js.map