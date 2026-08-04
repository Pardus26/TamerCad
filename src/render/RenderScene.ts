// src/render/RenderScene.ts


import { MeshBody } from "../geometry/mesh/MeshBody";





export interface RenderObject {

    id:string;

    visible:boolean;

}





export interface SceneSelection {


    id:string;


    type:

        | "MeshBody"

        | "Object";


}





export interface BackgroundColor {


    r:number;

    g:number;

    b:number;

    a:number;


}





export interface RenderSceneStatistics {


    meshBodies:number;

    renderObjects:number;

    vertices:number;

    triangles:number;

    selected:SceneSelection | null;


}





export class RenderScene {





    private readonly meshBodies:

        Map<string,MeshBody> =

            new Map();





    private readonly objects:

        Map<string,RenderObject> =

            new Map();





    private selection:

        SceneSelection | null = null;





    private revision:number = 0;





    private backgroundColor:

        BackgroundColor = {


            r:0.15,

            g:0.15,

            b:0.18,

            a:1.0


        };







    constructor(){}







    // =================================================
    // MeshBody
    // =================================================





    public addMeshBody(

        body:MeshBody

    ):void {


        this.meshBodies.set(

            body.id,

            body

        );


        this.touch();


    }







    public removeMeshBody(

        id:string

    ):boolean {


        const removed =

            this.meshBodies.delete(id);



        if(

            removed &&

            this.selection?.id===id

        ){

            this.clearSelection();

        }



        this.touch();


        return removed;


    }







    public getMeshBody(

        id:string

    ):

    MeshBody | undefined {


        return this.meshBodies.get(id);


    }







    public getMeshBodies():

    readonly MeshBody[]{


        return Array.from(

            this.meshBodies.values()

        );


    }







    public getVisibleMeshBodies():

    readonly MeshBody[]{


        return this.getMeshBodies()

            .filter(

                b=>b.visible

            );


    }







    public clearMeshBodies():

    void {


        this.meshBodies.clear();


        this.clearSelection();


        this.touch();


    }







    // =================================================
    // Render Objects
    // =================================================





    public addObject(

        object:RenderObject

    ):void {


        this.objects.set(

            object.id,

            object

        );


        this.touch();


    }







    public removeObject(

        id:string

    ):boolean {


        const removed =

            this.objects.delete(id);



        if(

            removed &&

            this.selection?.id===id

        ){

            this.clearSelection();

        }


        this.touch();


        return removed;


    }







    public getObjects():

    readonly RenderObject[]{


        return Array.from(

            this.objects.values()

        );


    }







    public getVisibleObjects():

    readonly RenderObject[]{


        return this.getObjects()

            .filter(

                o=>o.visible

            );


    }







    // =================================================
    // Selection
    // =================================================





    public select(

        selection:SceneSelection | null

    ):void {


        this.clearBodySelection();



        if(selection===null){

            this.selection=null;

            return;

        }




        if(

            selection.type==="MeshBody"

        ){

            const body =

                this.meshBodies.get(

                    selection.id

                );


            if(!body)

                return;



            body.selected=true;


        }




        this.selection={

            id:selection.id,

            type:selection.type

        };


        this.touch();


    }







    public selectMeshBody(

        id:string

    ):boolean {


        const body =

            this.meshBodies.get(id);



        if(!body)

            return false;



        this.clearBodySelection();



        body.selected=true;



        this.selection={


            id,


            type:"MeshBody"


        };



        this.touch();



        return true;


    }







    public clearSelection():

    void {


        this.clearBodySelection();


        this.selection=null;


        this.touch();


    }







    private clearBodySelection():

    void {


        for(

            const body of this.meshBodies.values()

        ){

            body.selected=false;

        }


    }







    public getSelection():

    SceneSelection | null {


        return this.selection;


    }







    public getSelectedBody():

    MeshBody | null {


        if(

            !this.selection ||

            this.selection.type!=="MeshBody"

        ){

            return null;

        }



        return (

            this.meshBodies.get(

                this.selection.id

            ) ?? null

        );


    }







    // =================================================
    // Visibility
    // =================================================





    public setMeshVisibility(

        id:string,

        visible:boolean

    ):boolean {


        const body =

            this.meshBodies.get(id);



        if(!body)

            return false;



        body.visible=visible;


        this.touch();


        return true;


    }







    public setObjectVisibility(

        id:string,

        visible:boolean

    ):boolean {


        const object=

            this.objects.get(id);



        if(!object)

            return false;



        object.visible=visible;


        this.touch();


        return true;


    }







    // =================================================
    // Renderer Access
    // =================================================





    public getRenderables():

    readonly MeshBody[]{


        return this.getVisibleMeshBodies();


    }







    // =================================================
    // Scene
    // =================================================





    public clear():

    void {


        this.meshBodies.clear();


        this.objects.clear();


        this.selection=null;


        this.touch();


    }







    public isEmpty():

    boolean {


        return (

            this.meshBodies.size===0 &&

            this.objects.size===0

        );


    }







    // =================================================
    // Background
    // =================================================





    public setBackgroundColor(

        r:number,

        g:number,

        b:number,

        a:number=1

    ):void {


        this.backgroundColor={

            r,

            g,

            b,

            a

        };


    }







    public getBackgroundColor():

    BackgroundColor {


        return {

            ...this.backgroundColor

        };


    }







    // =================================================
    // Statistics
    // =================================================





    public getStatistics():

    RenderSceneStatistics {


        let vertices=0;

        let triangles=0;



        for(

            const body of this.meshBodies.values()

        ){

            vertices +=

                body.getVertexCount();



            triangles +=

                body.getTriangleCount();

        }





        return {


            meshBodies:

                this.meshBodies.size,


            renderObjects:

                this.objects.size,


            vertices,


            triangles,


            selected:

                this.selection


        };


    }







    public getRevision():

    number {


        return this.revision;


    }







    private touch():

    void {


        this.revision++;


    }







    public debugInfo(){


        return {


            type:

                "RenderScene",


            revision:

                this.revision,


            meshBodies:

                this.meshBodies.size,


            objects:

                this.objects.size,


            selection:

                this.selection


        };


    }



}