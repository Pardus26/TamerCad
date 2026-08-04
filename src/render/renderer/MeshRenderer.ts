import { RenderCamera } from "../RenderCamera";
import { MeshBody } from "../../geometry/mesh/MeshBody";
import { Matrix4 } from "../../math/matrix/Matrix4";


export interface MeshRenderContext {


    viewportWidth:number;


    viewportHeight:number;


    time?:number;


    wireframe?:boolean;


}





export interface MeshRendererStatistics {


    drawCalls:number;


    renderedTriangles:number;


    renderedVertices:number;


    skippedObjects:number;


}





export class MeshRenderer {



    private statistics:

        MeshRendererStatistics = {


            drawCalls:0,


            renderedTriangles:0,


            renderedVertices:0,


            skippedObjects:0


        };





    constructor(){}







    // ------------------------------------------------
    // Frame
    // ------------------------------------------------


    public beginFrame():

    void{


        this.statistics = {


            drawCalls:0,


            renderedTriangles:0,


            renderedVertices:0,


            skippedObjects:0


        };


    }







    // ------------------------------------------------
    // Render MeshBody
    // ------------------------------------------------


    public render(

        body:MeshBody,

        camera:RenderCamera,

        context:MeshRenderContext

    ):void{



        /*
            Visibility
        */


        if(

            !body.visible

        ){

            this.statistics.skippedObjects++;

            return;

        }






        /*
            Locked object still renders

            but cannot be edited

        */






        const mesh =

            body.mesh;





        if(

            mesh.isEmpty()

        ){

            this.statistics.skippedObjects++;

            return;

        }






        /*
            Matrices


            Model:

                MeshBody transform


            View:

                Camera


            Projection:

                Camera


        */


        const modelMatrix =

            Matrix4.fromArray(

                body.transform

            );




        const viewMatrix =

            camera.getViewMatrix();




        const projectionMatrix =

            camera.getProjectionMatrix();






        /*
            GPU rendering point


            Later:

                OpenGL ES

                WebGPU

                Vulkan


        */


        this.drawMesh(

            mesh,

            modelMatrix,

            viewMatrix,

            projectionMatrix,

            context,

            body.selected

        );







        this.statistics.drawCalls++;




        this.statistics.renderedVertices +=

            mesh.vertexCount();




        this.statistics.renderedTriangles +=

            mesh.triangleCount();





    }









    // ------------------------------------------------
    // GPU Draw Placeholder
    // ------------------------------------------------


    private drawMesh(

        mesh:any,

        model:Matrix4,

        view:Matrix4,

        projection:Matrix4,

        context:MeshRenderContext,

        selected:boolean

    ):void{



        /*
        
        Buraya gerçek GPU kodu gelecek.


        OpenGL ES:

            glBindBuffer()
            glDrawElements()



        WebGPU:

            passEncoder.drawIndexed()



        Shader:

            uModel
            uView
            uProjection



        */



        void mesh;


        void model;


        void view;


        void projection;


        void context;


        void selected;


    }









    // ------------------------------------------------
    // Batch Render
    // ------------------------------------------------


    public renderBodies(

        bodies:readonly MeshBody[],

        camera:RenderCamera,

        context:MeshRenderContext

    ):void{


        for(

            const body of bodies

        ){


            this.render(

                body,

                camera,

                context

            );


        }


    }









    // ------------------------------------------------
    // Statistics
    // ------------------------------------------------


    public getStatistics():

    MeshRendererStatistics{


        return {


            ...this.statistics


        };


    }






    public endFrame():

    void{


        /*
            GPU sync


            SwapBuffers


        */


    }






    public reset():

    void{


        this.statistics = {


            drawCalls:0,


            renderedTriangles:0,


            renderedVertices:0,


            skippedObjects:0


        };


    }





}