import { Material, MaterialType } from "./Material";
export class LineMaterial extends Material {
    lineWidth = 1.0;
    dashed = false;
    dashSize = 5.0;
    gapSize = 5.0;
    constructor(name = "Line Material", options = {}) {
        super(name, MaterialType.Line);
        if (options.color) {
            this.color = {
                ...options.color
            };
        }
        if (options.lineWidth !== undefined) {
            this.lineWidth =
                options.lineWidth;
        }
        if (options.dashed !== undefined) {
            this.dashed =
                options.dashed;
        }
        if (options.dashSize !== undefined) {
            this.dashSize =
                options.dashSize;
        }
        if (options.gapSize !== undefined) {
            this.gapSize =
                options.gapSize;
        }
    }
    setShader(shader) {
        super.setShader(shader);
    }
    apply() {
        super.apply();
        const shader = this.getShader();
        if (!shader) {
            return;
        }
        shader.setUniform("lineWidth", this.lineWidth);
        shader.setUniform("lineDashed", this.dashed);
        shader.setUniform("dashSize", this.dashSize);
        shader.setUniform("gapSize", this.gapSize);
    }
    setLineWidth(width) {
        if (width <= 0) {
            throw new Error("Line width must be greater than zero.");
        }
        this.lineWidth =
            width;
    }
    setDashed(value) {
        this.dashed = value;
    }
    setDashPattern(dash, gap) {
        this.dashSize =
            dash;
        this.gapSize =
            gap;
    }
    clone() {
        return new LineMaterial(this.name, {
            color: {
                ...this.color
            },
            lineWidth: this.lineWidth,
            dashed: this.dashed,
            dashSize: this.dashSize,
            gapSize: this.gapSize
        });
    }
    toJSON() {
        return {
            ...super.toJSON(),
            lineWidth: this.lineWidth,
            dashed: this.dashed,
            dashSize: this.dashSize,
            gapSize: this.gapSize
        };
    }
    static fromJSON(data) {
        return new LineMaterial(data.name, {
            color: data.color,
            lineWidth: data.lineWidth,
            dashed: data.dashed,
            dashSize: data.dashSize,
            gapSize: data.gapSize
        });
    }
}
//# sourceMappingURL=LineMaterial.js.map