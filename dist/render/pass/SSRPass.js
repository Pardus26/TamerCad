import { RenderPass } from "./RenderPass";
import { SSRTrace } from "../postprocess/SSRTrace";
import { SSRResolve } from "../postprocess/SSRResolve";
import { SSRTemporalFilter } from "../postprocess/SSRTemporalFilter";
import { SSRDenoise } from "../postprocess/SSRDenoise";
import { SSRComposite } from "../postprocess/SSRComposite";
export class SSRPass extends RenderPass {
    buffer = null;
    trace = new SSRTrace();
    resolve = new SSRResolve();
    temporal = new SSRTemporalFilter();
    denoise = new SSRDenoise();
    composite = new SSRComposite();
    constructor() {
        super({
            name: "SSRPass",
            priority: 250
        });
    }
    reads() {
        return [
            "GBuffer_Position",
            "GBuffer_Normal",
            "HDR_Lighting"
        ];
    }
    writes() {
        return [
            "SSR"
        ];
    }
    setBuffer(buffer) {
        this.buffer = buffer;
    }
    begin(context) {
        this.buffer?.bind();
        super.begin(context);
    }
    execute(context, scene, camera) {
        this.trace.execute?.(context);
        this.resolve.execute?.(context);
        this.temporal.execute?.(context);
        this.denoise.execute?.(context);
        this.composite.execute?.(context);
    }
    end(context) {
        this.buffer?.unbind();
    }
}
//# sourceMappingURL=SSRPass.js.map