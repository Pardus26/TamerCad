import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";


export interface Mesh3Triangle {

    a:number;

    b:number;

    c:number;

}



export interface Mesh3BoundingBox {

    min:Point3;

    max:Point3;

}





export class Mesh3 {


    public readonly vertices:Point3[];


    public readonly triangles:Mesh3Triangle[];


    public normals:Vector3[];


    public uvs:number[][];



    constructor(){


        this.vertices=[];


        this.triangles=[];


        this.normals=[];


        this.uvs=[];


    }






    public addVertex(

        point:Point3

    ):number{


        this.vertices.push(

            point.clone()

        );


        return (

            this.vertices.length-1

        );


    }






    public addTriangle(

        a:number,

        b:number,

        c:number

    ):void{


        this.triangles.push({

            a,

            b,

            c

        });


    }






    public getVertex(

        index:number

    ):Point3{


        return this.vertices[index];


    }






    public getTriangle(

        index:number

    ):Mesh3Triangle{


        return this.triangles[index];


    }






    public getVertices():

    readonly Point3[]{


        return this.vertices;


    }






    public getTriangles():

    readonly Mesh3Triangle[]{


        return this.triangles;


    }






    public vertexCount():number{


        return this.vertices.length;


    }






    public triangleCount():number{


        return this.triangles.length;


    }






    public computeNormals():void{


        this.normals.length=0;



        for(

            let i=0;

            i<this.vertices.length;

            i++

        ){


            this.normals.push(

                new Vector3(

                    0,

                    0,

                    0

                )

            );


        }





        for(

            const triangle of this.triangles

        ){


            const a=

                this.vertices[triangle.a];


            const b=

                this.vertices[triangle.b];


            const c=

                this.vertices[triangle.c];




            const ab=

                b.subtract(a);



            const ac=

                c.subtract(a);




            const normal=

                ab

                .cross(ac)

                .normalize();





            this.normals[triangle.a]=

                this.normals[triangle.a]

                .add(normal);



            this.normals[triangle.b]=

                this.normals[triangle.b]

                .add(normal);



            this.normals[triangle.c]=

                this.normals[triangle.c]

                .add(normal);



        }





        for(

            let i=0;

            i<this.normals.length;

            i++

        ){


            this.normals[i]=

                this.normals[i]

                .normalize();


        }


    }








    public computeSurfaceArea():number{


        let total=0;



        for(

            const triangle of this.triangles

        ){


            const a=

                this.vertices[triangle.a];


            const b=

                this.vertices[triangle.b];


            const c=

                this.vertices[triangle.c];




            const ab=

                b.subtract(a);



            const ac=

                c.subtract(a);




            total +=

                ab

                .cross(ac)

                .length()

                *

                0.5;


        }



        return total;


    }







    public getBoundingBox():

    Mesh3BoundingBox | null{


        if(

            this.vertices.length===0

        ){

            return null;

        }



        let minX=Infinity;

        let minY=Infinity;

        let minZ=Infinity;



        let maxX=-Infinity;

        let maxY=-Infinity;

        let maxZ=-Infinity;





        for(

            const p of this.vertices

        ){


            minX=Math.min(

                minX,

                p.x

            );


            minY=Math.min(

                minY,

                p.y

            );


            minZ=Math.min(

                minZ,

                p.z

            );




            maxX=Math.max(

                maxX,

                p.x

            );


            maxY=Math.max(

                maxY,

                p.y

            );


            maxZ=Math.max(

                maxZ,

                p.z

            );


        }




        return {


            min:new Point3(

                minX,

                minY,

                minZ

            ),


            max:new Point3(

                maxX,

                maxY,

                maxZ

            )


        };


    }







    public clear():void{


        this.vertices.length=0;


        this.triangles.length=0;


        this.normals.length=0;


        this.uvs.length=0;


    }






    public isEmpty():boolean{


        return (

            this.vertices.length===0 ||

            this.triangles.length===0

        );


    }







    public clone():Mesh3{


        const mesh=

            new Mesh3();



        for(

            const vertex of this.vertices

        ){


            mesh.addVertex(

                vertex

            );


        }




        for(

            const triangle of this.triangles

        ){


            mesh.addTriangle(

                triangle.a,

                triangle.b,

                triangle.c

            );


        }




        mesh.computeNormals();



        mesh.uvs=

            this.uvs.map(

                uv=>[...uv]

            );



        return mesh;


    }






    public toJSON(){


        return {


            vertices:

                this.vertices.map(

                    v=>({

                        x:v.x,

                        y:v.y,

                        z:v.z

                    })

                ),



            triangles:

                this.triangles.map(

                    t=>({

                        a:t.a,

                        b:t.b,

                        c:t.c

                    })

                ),



            uvs:this.uvs


        };


    }






    public static fromJSON(

        data:any

    ):Mesh3{


        const mesh=

            new Mesh3();



        for(

            const v of data.vertices

        ){


            mesh.addVertex(

                new Point3(

                    v.x,

                    v.y,

                    v.z

                )

            );


        }





        for(

            const t of data.triangles

        ){


            mesh.addTriangle(

                t.a,

                t.b,

                t.c

            );


        }




        mesh.uvs=

            data.uvs ?? [];



        mesh.computeNormals();



        return mesh;


    }







    public toString():string{


        return (

            `Mesh3(` +

            `Vertices:${this.vertices.length}, ` +

            `Triangles:${this.triangles.length}` +

            `)`

        );


    }


}