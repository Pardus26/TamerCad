export var BufferUsage;
(function (BufferUsage) {
    BufferUsage["Static"] = "Static";
    BufferUsage["Dynamic"] = "Dynamic";
    BufferUsage["Stream"] = "Stream";
})(BufferUsage || (BufferUsage = {}));
export var BufferType;
(function (BufferType) {
    BufferType["Vertex"] = "Vertex";
    BufferType["Normal"] = "Normal";
    BufferType["UV"] = "UV";
    BufferType["Custom"] = "Custom";
})(BufferType || (BufferType = {}));
export class VertexBuffer {
    type;
    usage;
    data = null;
    gpuBuffer = null;
    uploaded = false;
    constructor(type = BufferType.Vertex, usage = BufferUsage.Static) {
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
         * Backend bağımsız GPU yükleme.
         *
         * WebGL:
         *
         * gl.createBuffer()
         * gl.bindBuffer()
         * gl.bufferData()
         *
         */
        if (context.nativeContext) {
            this.gpuBuffer = {
                backend: context.backend,
                size: this.data.byteLength,
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
         * GPU bind işlemi
         *
         * WebGL:
         *
         * gl.bindBuffer(...)
         *
         */
    }
    update(data, context) {
        this.setData(data);
        this.upload(context);
    }
    isUploaded() {
        return this.uploaded;
    }
    getSize() {
        return this.data
            ? this.data.byteLength
            : 0;
    }
    dispose() {
        /**
         * GPU buffer silme
         *
         * gl.deleteBuffer()
         *
         */
        this.gpuBuffer = null;
        this.data = null;
        this.uploaded = false;
    }
}
//# sourceMappingURL=VertexBuffer.js.map