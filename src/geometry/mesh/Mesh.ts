import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";
import { Vector3 } from "../../math/vector/Vector3";


export interface MeshBoundingBox {

    min:Vector3;

    max:Vector3;

}




export class Mesh {


    public name:string;



    private vertices:

        MeshVertex[] = [];



    private triangles:

        MeshTriangle[] = [];



    private normals:

        Vector3[] = [];





    private surfaceAreaCache:

        number | null = null;



    private boundingBoxCache:

        MeshBoundingBox | null = null;






    constructor(

        name:string="Mesh"

    ){

        this.name=name;

    }







    // ------------------------------------------------
    // Vertex
    // ------------------------------------------------


    public addVertex(

        vertex:MeshVertex

    ):number{


        this.vertices.push(

            vertex

        );


        this.invalidate();


        return (

            this.vertices.length-1

        );


    }







    public getVertex(

        index:number

    ):MeshVertex{


        return this.vertices[index];


    }







    public getVertices():

    readonly MeshVertex[]{


        return this.vertices;


    }







    public vertexCount():

    number{


        return this.vertices.length;


    }







    // ------------------------------------------------
    // Triangle
    // ------------------------------------------------


    public addTriangle(

        triangle:MeshTriangle

    ):void{


        if(

            !this.validTriangle(triangle)

        ){

            throw new Error(

                "Invalid triangle"

            );

        }



        this.triangles.push(

            triangle

        );



        this.invalidate();


    }







    public getTriangle(

        index:number

    ):MeshTriangle{


        return this.triangles[index];


    }







    public getTriangles():

    readonly MeshTriangle[]{


        return this.triangles;


    }







    public triangleCount():

    number{


        return this.triangles.length;


    }







    // ------------------------------------------------
    // Normals
    // ------------------------------------------------


    public computeNormals():

    void{


        this.normals=[];



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

                this.vertices[

                    triangle.a

                ].position;



            const b=

                this.vertices[

                    triangle.b

                ].position;



            const c=

                this.vertices[

                    triangle.c

                ].position;



            const normal =

                b.subtract(a)

                .cross(

                    c.subtract(a)

                )

                .normalize();





            this.normals[triangle.a] =

                this.normals[triangle.a]

                .add(normal);



            this.normals[triangle.b] =

                this.normals[triangle.b]

                .add(normal);



            this.normals[triangle.c] =

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







    public getNormals():

    readonly Vector3[]{


        if(

            this.normals.length===0

        ){

            this.computeNormals();

        }


        return this.normals;


    }







    // ------------------------------------------------
    // Surface
    // ------------------------------------------------


    public computeSurfaceArea():

    number{


        if(

            this.surfaceAreaCache!==null

        ){

            return this.surfaceAreaCache;

        }



        let area=0;



        for(

            const triangle of this.triangles

        ){


            area +=

                triangle.computeArea(

                    this.vertices

                );


        }



        this.surfaceAreaCache=

            area;



        return area;


    }







    // ------------------------------------------------
    // Bounding Box
    // ------------------------------------------------


    public getBoundingBox():

    MeshBoundingBox | null{


        if(

            this.boundingBoxCache

        ){

            return this.boundingBoxCache;

        }



        if(

            this.vertices.length===0

        ){

            return null;

        }



        let min=

            this.vertices[0]

            .position.clone();



        let max=

            this.vertices[0]

            .position.clone();





        for(

            const vertex of this.vertices

        ){


            const p=

                vertex.position;



            min.x=Math.min(min.x,p.x);

            min.y=Math.min(min.y,p.y);

            min.z=Math.min(min.z,p.z);



            max.x=Math.max(max.x,p.x);

            max.y=Math.max(max.y,p.y);

            max.z=Math.max(max.z,p.z);


        }




        this.boundingBoxCache={

            min,

            max

        };



        return this.boundingBoxCache;


    }







    // ------------------------------------------------
    // Utility
    // ------------------------------------------------


    public isEmpty():

    boolean{


        return (

            this.vertices.length===0 ||

            this.triangles.length===0

        );


    }







    public validate():

    boolean{


        for(

            const triangle of this.triangles

        ){


            if(

                !this.validTriangle(triangle)

            ){

                return false;

            }


        }



        return true;


    }







    private validTriangle(

        triangle:MeshTriangle

    ):


    boolean{


        return (

            triangle.a>=0 &&

            triangle.b>=0 &&

            triangle.c>=0 &&


            triangle.a<this.vertices.length &&

            triangle.b<this.vertices.length &&

            triangle.c<this.vertices.length

        );


    }







    // ------------------------------------------------
    // Clone
    // ------------------------------------------------


    public clone():

    Mesh{


        const mesh=

            new Mesh(

                this.name

            );



        for(

            const vertex of this.vertices

        ){

            mesh.addVertex(

                vertex.clone()

            );

        }



        for(

            const triangle of this.triangles

        ){

            mesh.addTriangle(

                triangle.clone()

            );

        }



        return mesh;


    }







    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------


    public toJSON(){


        return {


            name:this.name,


            vertices:

                this.vertices.map(

                    v=>v.toJSON()

                ),



            triangles:

                this.triangles.map(

                    t=>t.toJSON()

                )


        };


    }







    public static fromJSON(

        data:any

    ):


    Mesh{


        const mesh=

            new Mesh(

                data.name

            );



        for(

            const vertex of data.vertices

        ){

            mesh.addVertex(

                MeshVertex.fromJSON(

                    vertex

                )

            );


        }




        for(

            const triangle of data.triangles

        ){

            mesh.addTriangle(

                MeshTriangle.fromJSON(

                    triangle

                )

            );


        }




        return mesh;


    }







    public clear():

    void{


        this.vertices.length=0;


        this.triangles.length=0;


        this.normals.length=0;


        this.invalidate();


    }







    private invalidate():

    void{


        this.surfaceAreaCache=null;


        this.boundingBoxCache=null;


        this.normals=[];


    }


}