import { Shell }
from "./Shell";


import { Face }
from "./Face";


import { Edge }
from "./Edge";


import { Vertex }
from "./Vertex";







export class Solid {



    private shells:

    Shell[] = [];







    constructor(

        shell:Shell

    ){



        this.shells.push(

            shell

        );

    }









    addShell(

        shell:Shell

    ):

    void {



        if(

            !this.shells.includes(

                shell

            )

        ){



            this.shells.push(

                shell

            );

        }

    }









    removeShell(

        shell:Shell

    ):

    void {



        const index =

        this.shells.indexOf(

            shell

        );





        if(

            index !== -1

        ){



            this.shells.splice(

                index,

                1

            );

        }

    }









    getShells():

    Shell[] {



        return this.shells;

    }









    getFaces():

    Face[] {



        const faces:

        Face[] = [];





        for(

            const shell of

            this.shells

        ){



            for(

                const face of

                shell.getFaces()

            ){



                if(

                    !faces.includes(

                        face

                    )

                ){



                    faces.push(

                        face

                    );

                }

            }

        }





        return faces;

    }









    getEdges():

    Edge[] {



        const edges:

        Edge[] = [];





        for(

            const shell of

            this.shells

        ){



            for(

                const edge of

                shell.getEdges()

            ){



                if(

                    !edges.includes(

                        edge

                    )

                ){



                    edges.push(

                        edge

                    );

                }

            }

        }





        return edges;

    }









    getVertices():

    Vertex[] {



        const vertices:

        Vertex[] = [];





        for(

            const shell of

            this.shells

        ){



            for(

                const vertex of

                shell.getVertices()

            ){



                if(

                    !vertices.includes(

                        vertex

                    )

                ){



                    vertices.push(

                        vertex

                    );

                }

            }

        }





        return vertices;

    }









    isValid():

    boolean {



        if(

            this.shells.length === 0

        ){

            return false;

        }





        for(

            const shell of

            this.shells

        ){



            if(

                !shell.isClosed()

            ){

                return false;

            }

        }





        return true;

    }









    volume():

    number {



        /*

            Gerçek BRep kernel:

            Signed tetrahedral volume

            hesaplaması burada yapılacak.



            Şimdilik placeholder.

        */



        return 0;

    }









    surfaceArea():

    number {



        let area =

        0;





        for(

            const face of

            this.getFaces()

        ){



            area +=

            face.area();

        }





        return area;

    }









    containsFace(

        face:Face

    ):

    boolean {



        return this.getFaces()

        .includes(

            face

        );

    }









    containsEdge(

        edge:Edge

    ):

    boolean {



        return this.getEdges()

        .includes(

            edge

        );

    }









    clear():

    void {



        this.shells = [];

    }









    clone():

    Solid {



        const clonedShells =

        this.shells

        .map(

            shell =>

            shell.clone()

        );





        return new Solid(

            clonedShells[0]

        );

    }







}