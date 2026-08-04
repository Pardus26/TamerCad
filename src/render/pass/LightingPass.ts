import { RenderPass } from "./RenderPass";

import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";

import { GBuffer } from "../postprocess/GBuffer";
import { EnvironmentMap } from "../postprocess/EnvironmentMap";
import { ReflectionProbeBuffer } from "../postprocess/ReflectionProbeBuffer";
import { SSRComposite } from "../postprocess/SSRComposite";

import { MeshRenderer } from "../renderer/MeshRenderer";

import { Light } from "../light/Light";



export interface LightingPassOptions {

    renderer?:MeshRenderer;

    gBuffer?:GBuffer;

    environment?:EnvironmentMap;

    reflectionProbe?:ReflectionProbeBuffer;

    ssrComposite?:SSRComposite;

}




export class LightingPass extends RenderPass {


    private renderer:
        MeshRenderer|null=null;


    private gBuffer:
        GBuffer|null=null;


    private environment:
        EnvironmentMap|null=null;


    private reflectionProbe:
        ReflectionProbeBuffer|null=null;


    private ssrComposite:
        SSRComposite|null=null;




    constructor(
        options:LightingPassOptions={}
    )
    {

        super({

            name:"LightingPass",

            priority:200

        });



        this.renderer =
            options.renderer ?? null;


        this.gBuffer =
            options.gBuffer ?? null;


        this.environment =
            options.environment ?? null;


        this.reflectionProbe =
            options.reflectionProbe ?? null;


        this.ssrComposite =
            options.ssrComposite ?? null;

    }





    reads():string[]
    {

        return [

            "Depth",

            "GBuffer_Position",

            "GBuffer_Normal",

            "GBuffer_Albedo",

            "GBuffer_Material",

            "SSAO",

            "SSR"

        ];

    }





    writes():string[]
    {

        return [

            "HDR_Lighting"

        ];

    }





    protected execute(

        context:RenderContext,

        scene:RenderScene,

        camera:RenderCamera

    )
    {

        if(!this.gBuffer)
            return;



        this.gBuffer.bind();



        const lights =
            scene.getLights
            ? scene.getLights()
            : [];



        for(const light of lights)
        {

            this.renderer?.renderLight?.(

                context,

                light,

                camera

            );

        }



        this.environment?.bind?.();


    }





    debugInfo()
    {

        return {

            type:"LightingPass",

            gBuffer:
                this.gBuffer!==null,

            environment:
                this.environment!==null

        };

    }


}