export var ShaderType;
(function (ShaderType) {
    ShaderType["Vertex"] = "Vertex";
    ShaderType["Fragment"] = "Fragment";
    ShaderType["Compute"] = "Compute";
})(ShaderType || (ShaderType = {}));
export class Shader {
    type;
    source;
    compiled = false;
    nativeShader = null;
    constructor(type, source) {
        this.type = type;
        this.source = source;
    }
    compile(context) {
        if (!context.nativeContext) {
            this.compiled = true;
            return;
        }
        /**
         * Backend bağımsız shader compile.
         *
         * WebGL:
         *
         * gl.createShader()
         * gl.shaderSource()
         * gl.compileShader()
         *
         */
        this.nativeShader = {
            backend: context.backend,
            type: this.type,
            source: this.source
        };
        this.compiled = true;
    }
    isCompiled() {
        return this.compiled;
    }
    getNativeShader() {
        return this.nativeShader;
    }
    validate() {
        if (!this.source ||
            this.source.trim().length === 0) {
            return false;
        }
        return true;
    }
    getSource() {
        return this.source;
    }
    dispose() {
        /**
         * GPU shader silme.
         *
         * WebGL:
         *
         * gl.deleteShader()
         */
        this.nativeShader = null;
        this.compiled = false;
    }
}
//# sourceMappingURL=Shader.js.map