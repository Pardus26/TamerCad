// src/geometry/mesh/Mesh3.ts

import { Point3 } from "../point/Point3";
import { Vector3 } from "../../math/vector/Vector3";


export interface MeshTriangle {

    a:number;

    b:number;

    c:number;

}



export interface BoundingBox {

    min:Point3;

    max:Point3;

}



export interface BoundingSphere {

    center:Point3;

    radius:number;

}





export class Mesh3 {


    public readonly id:string;


    public name:string;


    private vertices:Point3[] = [];


    private triangles:MeshTriangle[] = [];


    private normals:Vector3[] = [];


    private uvs:number[][] = [];



    private boundingBoxCache:

        BoundingBox | null = null;



    private boundingSphereCache:

        BoundingSphere | null = null;



    private areaCache:

        number | null = null;



    private volumeCache:

        number | null = null;





    constructor(

        name:string = "Mesh3"

    ){

        this.name = name;


        this.id =

            Mesh3.generateId();

    }





    // ------------------------------------------------
    // Vertex Management
    // ------------------------------------------------


    public addVertex(

        point:Point3

    ):number{


        this.vertices.push(

            point.clone()

        );


        this.invalidateCache();


        return (

            this.vertices.length - 1

        );

    }





    public getVertex(

        index:number

    ):Point3{


        if(

            index < 0 ||

            index >= this.vertices.length

        ){

            throw new Error(

                "Vertex index out of range"

            );

        }


        return this.vertices[index];

    }





    public getVertices():

    readonly Point3[]{


        return this.vertices;

    }





    public vertexCount():

    number{


        return this.vertices.length;

    }





    public removeVertex(

        index:number

    ):boolean{


        if(

            !this.vertices[index]

        ){

            return false;

        }


        this.vertices.splice(

            index,

            1

        );


        this.invalidateCache();


        return true;

    }





    // ------------------------------------------------
    // Triangle Management
    // ------------------------------------------------


    public addTriangle(

        a:number,

        b:number,

        c:number

    ):void{


        if(

            !this.validIndex(a) ||

            !this.validIndex(b) ||

            !this.validIndex(c)

        ){

            throw new Error(

                "Invalid triangle index"

            );

        }



        this.triangles.push({

            a,

            b,

            c

        });



        this.invalidateCache();

    }





    public getTriangle(

        index:number

    ):MeshTriangle{


        if(

            index < 0 ||

            index >= this.triangles.length

        ){

            throw new Error(

                "Triangle index out of range"

            );

        }


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





    public removeTriangle(

        index:number

    ):boolean{


        if(

            index < 0 ||

            index >= this.triangles.length

        ){

            return false;

        }


        this.triangles.splice(

            index,

            1

        );


        this.invalidateCache();


        return true;

    }





    // ------------------------------------------------
    // Normal Calculation
    // ------------------------------------------------


    public computeNormals():

    void{


        this.normals = [];



        for(

            let i = 0;

            i < this.vertices.length;

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

            const tri of this.triangles

        ){


            const a =

                this.vertices[tri.a];


            const b =

                this.vertices[tri.b];


            const c =

                this.vertices[tri.c];





            const ab =

                b.subtract(a);



            const ac =

                c.subtract(a);





            const normal =

                ab

                .cross(ac)

                .normalize();





            this.normals[tri.a] =

                this.normals[tri.a]

                .add(normal);



            this.normals[tri.b] =

                this.normals[tri.b]

                .add(normal);



            this.normals[tri.c] =

                this.normals[tri.c]

                .add(normal);


        }





        for(

            let i = 0;

            i < this.normals.length;

            i++

        ){

            this.normals[i] =

                this.normals[i]

                .normalize();

        }


    }





    public getNormals():

    readonly Vector3[]{


        if(

            this.normals.length === 0

        ){

            this.computeNormals();

        }


        return this.normals;

    }





    // ------------------------------------------------
    // Surface Area
    // ------------------------------------------------


    public area():

    number{


        if(

            this.areaCache !== null

        ){

            return this.areaCache;

        }





        let total = 0;





        for(

            const tri of this.triangles

        ){


            const a =

                this.vertices[tri.a];


            const b =

                this.vertices[tri.b];


            const c =

                this.vertices[tri.c];





            total +=

                b

                .subtract(a)

                .cross(

                    c.subtract(a)

                )

                .length()

                *

                0.5;


        }





        this.areaCache = total;


        return total;

    }





    public surfaceArea():

    number{


        return this.area();

    }





    // ------------------------------------------------
    // Volume
    // ------------------------------------------------


    public volume():

    number{


        if(

            this.volumeCache !== null

        ){

            return this.volumeCache;

        }





        let volume = 0;





        for(

            const tri of this.triangles

        ){


            const a =

                this.vertices[tri.a];


            const b =

                this.vertices[tri.b];


            const c =

                this.vertices[tri.c];





            volume +=

                a.dot(

                    b.cross(c)

                ) / 6;


        }





        this.volumeCache =

            Math.abs(volume);



        return this.volumeCache;

    }





    // ------------------------------------------------
    // Validation Helpers
    // ------------------------------------------------


    private validIndex(

        index:number

    ):boolean{


        return (

            index >= 0 &&

            index < this.vertices.length

        );

    }

    // ------------------------------------------------
    // Bounding Box
    // ------------------------------------------------


    public boundingBox():

    BoundingBox | null{


        if(

            this.boundingBoxCache

        ){

            return this.boundingBoxCache;

        }





        if(

            this.vertices.length === 0

        ){

            return null;

        }





        let minX = Infinity;

        let minY = Infinity;

        let minZ = Infinity;



        let maxX = -Infinity;

        let maxY = -Infinity;

        let maxZ = -Infinity;





        for(

            const p of this.vertices

        ){

            minX = Math.min(

                minX,

                p.x

            );


            minY = Math.min(

                minY,

                p.y

            );


            minZ = Math.min(

                minZ,

                p.z

            );




            maxX = Math.max(

                maxX,

                p.x

            );


            maxY = Math.max(

                maxY,

                p.y

            );


            maxZ = Math.max(

                maxZ,

                p.z

            );


        }





        this.boundingBoxCache = {


            min:

                new Point3(

                    minX,

                    minY,

                    minZ

                ),



            max:

                new Point3(

                    maxX,

                    maxY,

                    maxZ

                )


        };





        return this.boundingBoxCache;


    }






    /**
     * MeshBody uyumluluğu
     */
    public getBoundingBox():

    BoundingBox | null{


        return this.boundingBox();


    }





    // ------------------------------------------------
    // Bounding Sphere
    // ------------------------------------------------


    public boundingSphere():

    BoundingSphere | null{


        if(

            this.boundingSphereCache

        ){

            return this.boundingSphereCache;

        }





        const box =

            this.boundingBox();





        if(!box)

            return null;





        const center =

            new Point3(

                (

                    box.min.x +

                    box.max.x

                ) * 0.5,



                (

                    box.min.y +

                    box.max.y

                ) * 0.5,



                (

                    box.min.z +

                    box.max.z

                ) * 0.5

            );





        let radius = 0;





        for(

            const p of this.vertices

        ){


            radius = Math.max(

                radius,

                p.distanceTo(

                    center

                )

            );


        }





        this.boundingSphereCache = {


            center,


            radius


        };





        return this.boundingSphereCache;


    }





    public getBoundingSphere():

    BoundingSphere | null{


        return this.boundingSphere();


    }







    // ------------------------------------------------
    // Center Of Mass
    // ------------------------------------------------


    public centerOfMass():

    Point3{


        if(

            this.vertices.length === 0

        ){

            return new Point3(

                0,

                0,

                0

            );

        }





        let x = 0;

        let y = 0;

        let z = 0;





        for(

            const p of this.vertices

        ){

            x += p.x;

            y += p.y;

            z += p.z;


        }





        const count =

            this.vertices.length;





        return new Point3(

            x / count,

            y / count,

            z / count

        );


    }






    // ------------------------------------------------
    // Clone
    // ------------------------------------------------


    public clone():

    Mesh3{


        const mesh =

            new Mesh3(

                this.name

            );





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





        mesh.uvs =

            this.uvs.map(

                uv => [

                    ...uv

                ]

            );





        mesh.computeNormals();





        return mesh;


    }






    // ------------------------------------------------
    // Serialization
    // ------------------------------------------------


    public toJSON(){


        return {


            id:

                this.id,



            name:

                this.name,



            vertices:

                this.vertices.map(

                    v =>

                        v.toJSON()

                ),



            triangles:

                this.triangles.map(

                    t => ({

                        a:t.a,

                        b:t.b,

                        c:t.c

                    })

                ),



            normals:

                this.normals.map(

                    n => ({

                        x:n.x,

                        y:n.y,

                        z:n.z

                    })

                ),



            uvs:

                this.uvs


        };


    }






    public static fromJSON(

        data:any

    ):

    Mesh3{


        if(!data)

        {

            throw new Error(

                "Invalid mesh data"

            );

        }





        const mesh =

            new Mesh3(

                data.name ??

                "Mesh3"

            );





        for(

            const vertex of

            data.vertices ?? []

        ){


            mesh.addVertex(

                Point3.fromJSON(

                    vertex

                )

            );


        }





        for(

            const triangle of

            data.triangles ?? []

        ){


            mesh.addTriangle(

                triangle.a,

                triangle.b,

                triangle.c

            );


        }





        mesh.uvs =

            data.uvs ?? [];





        mesh.computeNormals();





        return mesh;


    }






    // ------------------------------------------------
    // Clear
    // ------------------------------------------------


    public clear():

    void{


        this.vertices.length = 0;


        this.triangles.length = 0;


        this.normals.length = 0;


        this.uvs.length = 0;




        this.invalidateCache();


    }






    public isEmpty():

    boolean{


        return (

            this.vertices.length === 0 ||

            this.triangles.length === 0

        );


    }






    // ------------------------------------------------
    // Cache
    // ------------------------------------------------


    private invalidateCache():

    void{


        this.boundingBoxCache = null;


        this.boundingSphereCache = null;


        this.areaCache = null;


        this.volumeCache = null;


    }






    // ------------------------------------------------
    // Dispose
    // ------------------------------------------------


    public dispose():

    void{


        this.clear();


    }






    // ------------------------------------------------
    // Debug
    // ------------------------------------------------


    public debugInfo(){


        return {


            id:this.id,


            name:this.name,


            vertices:

                this.vertices.length,



            triangles:

                this.triangles.length,



            area:

                this.area(),



            volume:

                this.volume()



        };


    }






    private static generateId():

    string{


        return (

            "mesh3_" +

            Date.now() +

            "_" +

            Math.floor(

                Math.random()*1000000

            )

        );


    }





    public toString():

    string{


        return (

            `Mesh3(${this.name}) ` +

            `Vertices:${this.vertices.length} ` +

            `Triangles:${this.triangles.length}`

        );


    }


}