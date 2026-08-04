import { RenderPass } from "./RenderPass";

import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";

import { GBuffer } from "../postprocess/GBuffer";
import { SSAOBuffer } from "../postprocess/SSAOBuffer";

import { ShaderProgram } from "../shader/ShaderProgram";



export class SSAOPass extends RenderPass {


    private gBuffer:
        GBuffer|null=null;


    private output:
        SSAOBuffer|null=null;


    private shader:
        ShaderProgram|null=null;



    public radius=0.5;

    public bias=0.025;

    public power=1.5;





    constructor()
    {

        super({

            name:"SSAOPass",

            priority:175

        });

    }





    reads():string[]
    {

        return [

            "GBuffer_Position",

            "GBuffer_Normal"

        ];

    }





    writes():string[]
    {

        return [

            "SSAO"

        ];

    }





    protected begin(
        context:RenderContext
    )
    {

        this.output?.bind();

        super.begin(context);

    }





    protected execute(

        context:RenderContext,

        scene:RenderScene,

        camera:RenderCamera

    )
    {

        if(

            !this.shader ||

            !this.gBuffer

        )
            return;



        this.shader.bind();



        this.gBuffer.bind();



        this.shader.setUniform?.(

            "uRadius",

            this.radius

        );



        this.shader.setUniform?.(

            "uBias",

            this.bias

        );



        this.shader.setUniform?.(

            "uPower",

            this.power

        );



        context.drawFullscreenQuad?.();

    }





    protected end(
        context:RenderContext
    )
    {

        this.output?.unbind();

    }


}