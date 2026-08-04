import { RenderPass } from "./RenderPass";

import { RenderContext } from "../RenderContext";
import { RenderScene } from "../RenderScene";
import { RenderCamera } from "../RenderCamera";

import { GBuffer } from "../postprocess/GBuffer";

import { MeshRenderer } from "../renderer/MeshRenderer";
import { DisplayMesh } from "../display/DisplayMesh";


export interface GeometryPassOptions {

    gBuffer?: GBuffer;

    renderer?: MeshRenderer;

}



export class GeometryPass extends RenderPass {


    private gBuffer:
        GBuffer | null = null;


    private renderer:
        MeshRenderer | null = null;




    constructor(
        options:GeometryPassOptions={}
    )
    {

        super({

            name:"GeometryPass",

            priority:100,

            clearDepth:true

        });


        this.gBuffer =
            options.gBuffer ?? null;


        this.renderer =
            options.renderer ?? null;

    }





    reads():string[]
    {

        return [

            "Depth"

        ];

    }





    writes():string[]
    {

        return [

            "GBuffer_Position",

            "GBuffer_Normal",

            "GBuffer_Albedo",

            "GBuffer_Material",

            "ObjectID"

        ];

    }





    setGBuffer(
        buffer:GBuffer
    )
    {

        this.gBuffer = buffer;

    }





    setRenderer(
        renderer:MeshRenderer
    )
    {

        this.renderer = renderer;

    }





    protected override begin(
        context:RenderContext
    )
    {

        this.gBuffer?.bind();

        super.begin(context);

    }





    protected execute(

        context:RenderContext,

        scene:RenderScene,

        camera:RenderCamera

    )
    {

        if(!this.renderer)
            return;



        const meshes =
            scene.getVisibleMeshes
            ? scene.getVisibleMeshes(camera)
            : [];



        for(const mesh of meshes)
        {

            this.renderMesh(

                context,

                mesh,

                camera

            );

        }

    }





    private renderMesh(

        context:RenderContext,

        mesh:DisplayMesh,

        camera:RenderCamera

    )
    {

        if(!mesh.visible)
            return;



        this.renderer?.render(

            context,

            mesh,

            camera

        );

    }





    protected override end(
        context:RenderContext
    )
    {

        this.gBuffer?.unbind();

    }


}