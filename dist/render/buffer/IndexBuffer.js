export var IndexType;
(function (IndexType) {
    IndexType["Uint16"] = "Uint16";
    IndexType["Uint32"] = "Uint32";
})(IndexType || (IndexType = {}));
export var IndexBufferUsage;
(function (IndexBufferUsage) {
    IndexBufferUsage["Static"] = "Static";
    IndexBufferUsage["Dynamic"] = "Dynamic";
    IndexBufferUsage["Stream"] = "Stream";
})(IndexBufferUsage || (IndexBufferUsage = {}));
export class IndexBuffer {
    type;
    usage;
    data = null;
    gpuBuffer = null;
    uploaded = false;
    constructor(type = IndexType.Uint32, usage = IndexBufferUsage.Static) {
        this.type = type;
        this.usage = usage;
    }
    setData(data) {
        this.data = data;
        this.uploaded = false;
    }
    getData() {
        return this.data;
    }
    upload(context) {
        if (!this.data) {
            return;
        }
        /**
         * GPU index buffer oluşturma.
         *
         * WebGL:
         *
         * gl.createBuffer()
         * gl.bindBuffer(ELEMENT_ARRAY_BUFFER)
         * gl.bufferData()
         *
         */
        if (context.nativeContext) {
            this.gpuBuffer = {
                backend: context.backend,
                size: this.data.byteLength,
                indexType: this.type,
                usage: this.usage
            };
        }
        this.uploaded = true;
    }
    bind(context) {
        if (!this.uploaded) {
            this.upload(context);
        }
        /**
         * GPU bind işlemi.
         *
         * WebGL:
         *
         * gl.bindBuffer(
         *    gl.ELEMENT_ARRAY_BUFFER,
         *    buffer
         * )
         */
    }
    update(data, context) {
        this.setData(data);
        this.upload(context);
    }
    getCount() {
        if (!this.data) {
            return 0;
        }
        return this.data.length;
    }
    getSize() {
        return this.data
            ? this.data.byteLength
            : 0;
    }
    getIndexType() {
        return this.type;
    }
    isUploaded() {
        return this.uploaded;
    }
    dispose() {
        /**
         * GPU buffer temizleme.
         *
         * WebGL:
         *
         * gl.deleteBuffer()
         */
        this.gpuBuffer = null;
        this.data = null;
        this.uploaded = false;
    }
}
//# sourceMappingURL=IndexBuffer.js.map