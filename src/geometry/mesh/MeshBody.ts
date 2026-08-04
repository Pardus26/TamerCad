import { Mesh } from "./Mesh";

import { Vector3 } from "../../math/vector/Vector3";



export interface RayHit {

    hit:boolean;

    distance:number;

    point:Vector3 | null;

}





export class MeshBody {



    /**
     * Unique body identifier
     */
    public readonly id:string;



    /**
     * Display name
     */
    public name:string;



    /**
     * Geometry
     */
    public readonly mesh:Mesh;



    /**
     * Visibility
     */
    public visible=true;



    /**
     * Lock state
     */
    public locked=false;



    /**
     * Selection state
     */
    public selected=false;



    /**
     * Transform matrix
     */
    public transform:number[]=[

        1,0,0,0,

        0,1,0,0,

        0,0,1,0,

        0,0,0,1

    ];



    /**
     * Metadata
     */
    public metadata:Record<string,any>={};






    constructor(

        mesh:Mesh,

        name="MeshBody"

    ){


        this.mesh=mesh;


        this.name=name;


        this.id=

            MeshBody.generateId();


    }








    public getVertexCount():number{


        return this.mesh.vertexCount();


    }







    public getTriangleCount():number{


        return this.mesh.triangleCount();


    }







    public getSurfaceArea():number{


        return this.mesh.computeSurfaceArea();


    }







    public getBoundingBox(){


        return this.mesh.getBoundingBox();


    }








    /**
     * Ray picking
     *
     * Used by:
     * SelectionInputHandler
     *
     * Future:
     * BVH acceleration
     * Triangle intersection
     */
    public intersectRay(

        origin:Vector3,

        direction:Vector3

    ):RayHit | null {



        if(!this.visible){

            return null;

        }





        const box =

            this.getBoundingBox();





        /*
            İlk aşama:
            Bounding box testi


            Gerçek kernel aşaması:

            Ray -> Triangle
            Ray -> Face
            BVH Tree

        */



        const hit =

            this.intersectBoundingBox(

                origin,

                direction,

                box

            );





        if(!hit){


            return null;


        }





        return {


            hit:true,


            distance:hit,


            point:

                origin.clone()

                .add(

                    direction.clone()

                    .multiplyScalar(hit)

                )


        };

    }









    private intersectBoundingBox(

        origin:Vector3,

        direction:Vector3,

        box:any

    ):number | null {



        if(!box){

            return null;

        }



        /*
            Basit slab yöntemi

            Daha sonra:
            BoundingBox.ts içine taşınacak

        */



        let tmin=

            -Infinity;



        let tmax=

            Infinity;





        const min=

            box.min;



        const max=

            box.max;





        const axes=[

            "x",

            "y",

            "z"

        ];





        for(

            const axis of axes

        ){



            const o=

                origin[axis];



            const d=

                direction[axis];



            const mn=

                min[axis];



            const mx=

                max[axis];





            if(

                Math.abs(d)<0.000001

            ){


                if(

                    o<mn ||

                    o>mx

                ){

                    return null;

                }


            }

            else{


                let t1=

                    (mn-o)/d;



                let t2=

                    (mx-o)/d;





                if(t1>t2){


                    const temp=t1;

                    t1=t2;

                    t2=temp;


                }





                tmin=

                    Math.max(

                        tmin,

                        t1

                    );



                tmax=

                    Math.min(

                        tmax,

                        t2

                    );





                if(

                    tmin>tmax

                ){

                    return null;

                }


            }


        }





        if(tmax<0){


            return null;


        }





        return tmin>=0

            ? tmin

            : tmax;


    }









    public clone():MeshBody {



        const body=

            new MeshBody(

                this.mesh.clone(),

                this.name

            );





        body.visible=

            this.visible;



        body.locked=

            this.locked;



        body.selected=

            this.selected;



        body.transform=[

            ...this.transform

        ];



        body.metadata={

            ...this.metadata

        };





        return body;


    }









    public setSelected(

        value:boolean

    ):void{


        this.selected=value;


    }









    public toJSON(){


        return {


            id:this.id,


            name:this.name,


            visible:this.visible,


            locked:this.locked,


            selected:this.selected,


            transform:this.transform,


            metadata:this.metadata,


            mesh:this.mesh.toJSON()


        };


    }









    public static fromJSON(

        data:any

    ):MeshBody {



        const body=

            new MeshBody(

                Mesh.fromJSON(

                    data.mesh

                ),

                data.name

            );





        body.visible=

            data.visible;



        body.locked=

            data.locked;



        body.selected=

            data.selected;



        body.transform=

            [

                ...data.transform

            ];



        body.metadata=

            data.metadata ?? {};





        return body;


    }









    private static generateId():string{


        return (

            `mesh_${Date.now()}_` +

            `${Math.floor(

                Math.random()*1_000_000

            )}`

        );


    }


}