export class ShaderProgram {
    vertexShader;
    fragmentShader;
    linked = false;
    nativeProgram = null;
    uniforms = new Map();
    attributes = new Map();
    constructor(vertexShader, fragmentShader) {
        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
    }
    compile(context) {
        if (!this.vertexShader.isCompiled()) {
            this.vertexShader.compile(context);
        }
        if (!this.fragmentShader.isCompiled()) {
            this.fragmentShader.compile(context);
        }
    }
    link(context) {
        if (!this.vertexShader.validate()
            ||
                !this.fragmentShader.validate()) {
            throw new Error("Shader validation failed.");
        }
        /**
         * GPU program oluşturma.
         *
         * WebGL:
         *
         * gl.createProgram()
         * gl.attachShader()
         * gl.linkProgram()
         *
         */
        this.nativeProgram = {
            backend: context.backend,
            vertex: this.vertexShader.getNativeShader(),
            fragment: this.fragmentShader.getNativeShader()
        };
        this.linked = true;
    }
    use(context) {
        if (!this.linked) {
            throw new Error("Shader program is not linked.");
        }
        /**
         * GPU program aktif etme.
         *
         * WebGL:
         *
         * gl.useProgram()
         */
        void context;
    }
    setUniform(name, value) {
        this.uniforms.set(name, {
            name,
            value
        });
    }
    getUniform(name) {
        return this.uniforms.get(name);
    }
    addAttribute(name, location) {
        this.attributes.set(name, {
            name,
            location
        });
    }
    getAttribute(name) {
        return this.attributes.get(name);
    }
    hasUniform(name) {
        return this.uniforms.has(name);
    }
    hasAttribute(name) {
        return this.attributes.has(name);
    }
    isLinked() {
        return this.linked;
    }
    getNativeProgram() {
        return this.nativeProgram;
    }
    dispose() {
        /**
         * GPU program temizleme.
         *
         * WebGL:
         *
         * gl.deleteProgram()
         */
        this.nativeProgram = null;
        this.uniforms.clear();
        this.attributes.clear();
        this.linked = false;
    }
}
//# sourceMappingURL=ShaderProgram.js.map