import { RenderPass } from "./RenderPass";

import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";

import { SSRBuffer } from "../postprocess/SSRBuffer";

import { SSRTrace } from "../postprocess/SSRTrace";
import { SSRResolve } from "../postprocess/SSRResolve";
import { SSRTemporalFilter } from "../postprocess/SSRTemporalFilter";
import { SSRDenoise } from "../postprocess/SSRDenoise";
import { SSRComposite } from "../postprocess/SSRComposite";





export class SSRPass extends RenderPass {


    private buffer:
        SSRBuffer|null=null;



    private readonly trace =
        new SSRTrace();


    private readonly resolve =
        new SSRResolve();


    private readonly temporal =
        new SSRTemporalFilter();


    private readonly denoise =
        new SSRDenoise();


    private readonly composite =
        new SSRComposite();




    constructor()
    {

        super({

            name:"SSRPass",

            priority:250

        });

    }





    reads():string[]
    {

        return [

            "GBuffer_Position",

            "GBuffer_Normal",

            "HDR_Lighting"

        ];

    }





    writes():string[]
    {

        return [

            "SSR"

        ];

    }





    setBuffer(
        buffer:SSRBuffer
    )
    {

        this.buffer=buffer;

    }





    protected begin(
        context:RenderContext
    )
    {

        this.buffer?.bind();

        super.begin(context);

    }





    protected execute(

        context:RenderContext,

        scene:RenderScene,

        camera:RenderCamera

    )
    {

        this.trace.execute?.(context);

        this.resolve.execute?.(context);

        this.temporal.execute?.(context);

        this.denoise.execute?.(context);

        this.composite.execute?.(context);


    }





    protected end(
        context:RenderContext
    )
    {

        this.buffer?.unbind();

    }


}