// src/geometry/mesh/Mesh.ts


import { MeshVertex } from "./MeshVertex";
import { MeshTriangle } from "./MeshTriangle";
import { Point3 } from "../point/Point3";



export interface MeshStatistics {

    vertices:number;

    triangles:number;

    area:number;

}




export class Mesh {



    public readonly id:string;


    public name:string;



    private vertices:

        MeshVertex[] = [];



    private triangles:

        MeshTriangle[] = [];



    private triangleCounter = 0;



    private boundingBoxCache:

        {

            min:Point3;

            max:Point3;

        } | null = null;






    private areaCache:

        number | null = null;







    constructor(

        name:string="Mesh"

    ){

        this.name=name;

        this.id=

            Mesh.generateId();

    }







    // ---------------------------------------
    // Vertex
    // ---------------------------------------


    public addVertex(

        vertex:MeshVertex

    ):number {


        this.vertices.push(

            vertex

        );


        this.invalidate();


        return (

            this.vertices.length-1

        );


    }







    public createVertex(

        point:Point3

    ):number {


        return this.addVertex(

            new MeshVertex(

                Date.now(),

                point

            )

        );


    }







    public getVertex(

        index:number

    ):MeshVertex {


        return this.vertices[index];

    }







    public getVertices():

    readonly MeshVertex[]{


        return this.vertices;


    }







    public vertexCount():

    number {


        return this.vertices.length;

    }







    // ---------------------------------------
    // Triangle
    // ---------------------------------------


    public addTriangle(

        v1:number,

        v2:number,

        v3:number

    ):MeshTriangle {


        const triangle =

            new MeshTriangle(

                this.triangleCounter++,

                v1,

                v2,

                v3

            );



        if(

            !triangle.isValid(

                this.vertices.length

            )

        ){

            throw new Error(

                "Invalid triangle"

            );

        }



        this.triangles.push(

            triangle

        );


        this.invalidate();


        return triangle;


    }







    public getTriangle(

        index:number

    ):MeshTriangle {


        return this.triangles[index];


    }







    public getTriangles():

    readonly MeshTriangle[]{


        return this.triangles;


    }







    public triangleCount():

    number {


        return this.triangles.length;

    }







    // ---------------------------------------
    // Geometry
    // ---------------------------------------


    public computeSurfaceArea():

    number {


        if(

            this.areaCache!==null

        ){

            return this.areaCache;

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



        this.areaCache=area;



        return area;


    }







    public getBoundingBox(){


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



        let minX=Infinity;

        let minY=Infinity;

        let minZ=Infinity;



        let maxX=-Infinity;

        let maxY=-Infinity;

        let maxZ=-Infinity;




        for(

            const vertex of this.vertices

        ){


            const p=

                vertex.position;



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




        this.boundingBoxCache={


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



        return this.boundingBoxCache;


    }







    // ---------------------------------------
    // Editing
    // ---------------------------------------


    public removeTriangle(

        index:number

    ):boolean {


        if(

            index<0 ||

            index>=this.triangles.length

        ){

            return false;

        }


        this.triangles.splice(

            index,

            1

        );


        this.invalidate();


        return true;


    }







    public clear():

    void {


        this.vertices.length=0;

        this.triangles.length=0;

        this.invalidate();


    }







    public isEmpty():

    boolean {


        return (

            this.vertices.length===0 ||

            this.triangles.length===0

        );


    }







    // ---------------------------------------
    // Clone
    // ---------------------------------------


    public clone():

    Mesh {


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

            mesh.triangles.push(

                triangle.clone()

            );

        }



        return mesh;


    }







    // ---------------------------------------
    // Statistics
    // ---------------------------------------


    public statistics():

    MeshStatistics {


        return {


            vertices:

                this.vertexCount(),


            triangles:

                this.triangleCount(),


            area:

                this.computeSurfaceArea()


        };


    }







    // ---------------------------------------
    // Serialization
    // ---------------------------------------


    public toJSON(){


        return {


            id:this.id,


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

    ):Mesh {


        const mesh=

            new Mesh(

                data.name

            );



        for(

            const vertex of data.vertices ?? []

        ){

            mesh.vertices.push(

                MeshVertex.fromJSON(

                    vertex

                )

            );

        }



        for(

            const triangle of data.triangles ?? []

        ){

            mesh.triangles.push(

                MeshTriangle.fromJSON(

                    triangle

                )

            );

        }



        mesh.invalidate();



        return mesh;


    }







    // ---------------------------------------
    // Internal
    // ---------------------------------------


    private invalidate():

    void {


        this.areaCache=null;

        this.boundingBoxCache=null;


    }







    private static generateId():

    string {


        return (

            "mesh_" +

            Date.now() +

            "_" +

            Math.floor(

                Math.random()*1000000

            )

        );


    }



}