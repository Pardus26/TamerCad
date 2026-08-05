import { SerializerFormat } from "./Serializer";
import { StepReader } from "../../exchange/step/StepReader";
import { StepWriter } from "../../exchange/step/StepWriter";
export class StepSerializer {
    reader;
    writer;
    metadata = {
        format: SerializerFormat.STEP,
        version: "AP242",
        mimeType: "application/step",
        extension: ".step"
    };
    constructor(reader = new StepReader(), writer = new StepWriter()) {
        this.reader = reader;
        this.writer = writer;
    }
    serialize(document) {
        return this.writer.write(document);
    }
    deserialize(data) {
        return this.reader.read(data);
    }
    supports(format) {
        return format ===
            SerializerFormat.STEP;
    }
}
//# sourceMappingURL=StepSerializer.js.map