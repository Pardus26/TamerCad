import { Document } from "../../persistence/core/Document";
import { StepParser } from "./StepParser";
export class StepReader {
    parser = new StepParser();
    read(stepContent) {
        const parsed = this.parser.parse(stepContent);
        const document = new Document(parsed.fileName ??
            "Imported STEP");
        // TODO
        //
        // parsed.entities
        //        ↓
        // Geometry Builder
        //        ↓
        // BRepModel
        //        ↓
        // document.brep
        return document;
    }
}
//# sourceMappingURL=StepReader.js.map