export class STLBinaryReader {
    read(buffer) {
        const triangles = [];
        const view = new DataView(buffer);
        let offset = 80;
        const triangleCount = view.getUint32(offset, true);
        offset += 4;
        for (let i = 0; i < triangleCount; i++) {
            const normal = [
                view.getFloat32(offset, true),
                view.getFloat32(offset + 4, true),
                view.getFloat32(offset + 8, true)
            ];
            offset += 12;
            const vertices = [
                [
                    view.getFloat32(offset, true),
                    view.getFloat32(offset + 4, true),
                    view.getFloat32(offset + 8, true)
                ],
                [
                    view.getFloat32(offset + 12, true),
                    view.getFloat32(offset + 16, true),
                    view.getFloat32(offset + 20, true)
                ],
                [
                    view.getFloat32(offset + 24, true),
                    view.getFloat32(offset + 28, true),
                    view.getFloat32(offset + 32, true)
                ]
            ];
            offset += 36;
            // attribute byte count
            offset += 2;
            triangles.push({
                normal,
                vertices
            });
        }
        return triangles;
    }
}
//# sourceMappingURL=STLBinaryReader.js.map