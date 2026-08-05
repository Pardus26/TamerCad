export class StepWriter {
    write(document) {
        const lines = [];
        lines.push("ISO-10303-21;");
        lines.push("HEADER;");
        lines.push(this.fileDescription());
        lines.push(this.fileName(document.metadata.name));
        lines.push(this.fileSchema());
        lines.push("ENDSEC;");
        lines.push("DATA;");
        lines.push(...this.writeGeometry(document));
        lines.push("ENDSEC;");
        lines.push("END-ISO-10303-21;");
        return lines.join("\n");
    }
    fileDescription() {
        return;
        `FILE_DESCRIPTION(('OpenCAD Model'),'2;1');`;
    }
    fileName(name) {
        const date = new Date()
            .toISOString();
        return;
        `FILE_NAME('${name}','${date}',('OpenCAD'),('OpenCAD'),'OpenCAD','','');`;
    }
    fileSchema() {
        return;
        "FILE_SCHEMA(('AP242_MANAGED_MODEL_BASED_3D_ENGINEERING'));";
    }
    writeGeometry(document) {
        const output = [];
        // TODO:
        // BRep -> STEP entities
        // Vertex
        // Edge
        // Face
        // Shell
        // Solid
        output.push("/* Geometry export not implemented yet */");
        return output;
    }
}
//# sourceMappingURL=StepWriter.js.map