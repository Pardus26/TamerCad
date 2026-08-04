import { MeshBody } from "../geometry/mesh/MeshBody";


/**
 * Mesh dışı render objeleri
 */
export interface RenderObject {

    id: string;

    visible: boolean;

}


/**
 * Sahne seçim bilgisi
 */
export interface SceneSelection {

    id: string;

    type:
        | "MeshBody"
        | "Object";

}


/**
 * Arka plan rengi
 */
export interface BackgroundColor {

    r:number;

    g:number;

    b:number;

    a:number;

}


/**
 * Sahne istatistikleri
 */
export interface RenderSceneStatistics {

    meshBodies:number;

    renderObjects:number;

    vertices:number;

    triangles:number;

    selected:SceneSelection | null;

}


/**
 * CAD Render Scene
 *
 * Scene
 * |
 * MeshBody
 * |
 * DisplayMesh
 * |
 * Renderer
 */
export class RenderScene {


    private readonly meshBodies:

        Map<string,MeshBody> =

            new Map();



    private readonly objects:

        Map<string,RenderObject> =

            new Map();



    private selection:

        SceneSelection | null = null;



    private backgroundColor:

        BackgroundColor = {


            r:0.15,

            g:0.15,

            b:0.18,

            a:1.0


        };



    constructor(){}





    // ----------------------------------------------------
    // Mesh Bodies
    // ----------------------------------------------------


    public addMeshBody(

        body:MeshBody

    ):void{


        this.meshBodies.set(

            body.id,

            body

        );


    }





    public removeMeshBody(

        id:string

    ):boolean{


        if(

            this.selection?.id === id

        ){

            this.clearSelection();

        }



        return this.meshBodies.delete(id);


    }





    public getMeshBody(

        id:string

    ):MeshBody | undefined{


        return this.meshBodies.get(id);


    }





    public getMeshBodies():

    readonly MeshBody[]{


        return Array.from(

            this.meshBodies.values()

        );


    }





    public clearMeshBodies():

    void{


        this.meshBodies.clear();

        this.clearSelection();


    }





    // ----------------------------------------------------
    // Render Objects
    // ----------------------------------------------------


    public addObject(

        object:RenderObject

    ):void{


        this.objects.set(

            object.id,

            object

        );


    }





    public removeObject(

        id:string

    ):boolean{


        if(

            this.selection?.id === id

        ){

            this.clearSelection();

        }



        return this.objects.delete(id);


    }





    public getObject(

        id:string

    ):RenderObject | undefined{


        return this.objects.get(id);


    }





    public getObjects():

    readonly RenderObject[]{


        return Array.from(

            this.objects.values()

        );


    }





    public clearObjects():

    void{


        this.objects.clear();


    }





    // ----------------------------------------------------
    // Selection
    // ----------------------------------------------------


    public select(

        selection:SceneSelection | null

    ):void{


        if(selection===null){

            this.selection=null;

            return;

        }



        if(

            selection.type==="MeshBody" &&

            !this.meshBodies.has(selection.id)

        ){

            return;

        }



        if(

            selection.type==="Object" &&

            !this.objects.has(selection.id)

        ){

            return;

        }



        this.selection = {


            id:selection.id,


            type:selection.type


        };


    }





    public clearSelection():

    void{


        this.selection=null;


    }





    public getSelection():

    SceneSelection | null{


        return this.selection;


    }





    public selectMeshBody(

        id:string

    ):boolean{


        if(

            !this.meshBodies.has(id)

        ){

            return false;

        }



        this.selection={


            id,


            type:"MeshBody"


        };



        return true;


    }





    public selectObject(

        id:string

    ):boolean{


        if(

            !this.objects.has(id)

        ){

            return false;

        }



        this.selection={


            id,


            type:"Object"


        };



        return true;


    }





    // ----------------------------------------------------
    // Visibility
    // ----------------------------------------------------


    public setMeshVisibility(

        id:string,

        visible:boolean

    ):boolean{


        const body =

            this.meshBodies.get(id);



        if(!body){

            return false;

        }



        body.visible = visible;


        return true;


    }





    public setObjectVisibility(

        id:string,

        visible:boolean

    ):boolean{


        const object =

            this.objects.get(id);



        if(!object){

            return false;

        }



        object.visible = visible;


        return true;


    }





    // ----------------------------------------------------
    // Scene
    // ----------------------------------------------------


    public clear():

    void{


        this.meshBodies.clear();

        this.objects.clear();

        this.selection=null;


    }





    public isEmpty():

    boolean{


        return (

            this.meshBodies.size===0 &&

            this.objects.size===0

        );


    }





    // ----------------------------------------------------
    // Background
    // ----------------------------------------------------


    public setBackgroundColor(

        r:number,

        g:number,

        b:number,

        a:number=1

    ):void{


        this.backgroundColor={

            r,

            g,

            b,

            a

        };


    }





    public getBackgroundColor():

    BackgroundColor{


        return {

            ...this.backgroundColor

        };


    }





    // ----------------------------------------------------
    // Render Queries
    // ----------------------------------------------------


    public getVisibleMeshBodies():

    readonly MeshBody[]{


        return Array.from(

            this.meshBodies.values()

        ).filter(

            body=>body.visible

        );


    }





    public getVisibleObjects():

    readonly RenderObject[]{


        return Array.from(

            this.objects.values()

        ).filter(

            object=>object.visible

        );


    }





    // ----------------------------------------------------
    // Statistics
    // ----------------------------------------------------


    public getStatistics():

    RenderSceneStatistics{


        let vertices=0;

        let triangles=0;



        for(

            const body of this.meshBodies.values()

        ){


            vertices += body.getVertexCount();


            triangles += body.getTriangleCount();


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





    // ----------------------------------------------------
    // Debug
    // ----------------------------------------------------


    public debugInfo(){

        return {


            type:

                "RenderScene",


            meshBodies:

                this.meshBodies.size,


            objects:

                this.objects.size,


            selection:

                this.selection,


            background:

                this.backgroundColor


        };


    }


}