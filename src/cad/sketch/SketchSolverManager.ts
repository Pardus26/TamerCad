// src/cad/sketch/SketchSolverManager.ts


import {
    Sketch
}
from "./Sketch";



import {
    Solver2D,
    Solver2DResult
}
from "./Solver2D";



import {
    SketchEntity
}
from "./SketchEntity";



import {
    SketchConstraint
}
from "./SketchConstraint";









// =====================================================
// Solver Events
// =====================================================


export interface SketchSolverEvents {


    onSolved?:

        (
            result:Solver2DResult
        )=>void;



    onConstraintAdded?:

        (
            constraint:SketchConstraint
        )=>void;



    onConstraintRemoved?:

        (
            constraint:SketchConstraint
        )=>void;



    onError?:

        (
            error:Error
        )=>void;



}









// =====================================================
// Solver Snapshot
// =====================================================


interface SolverSnapshot {


    entities:any[];


    constraints:any[];


}









// =====================================================
// Manager Options
// =====================================================


export interface SketchSolverManagerOptions {


    sketch:Sketch;


    events?:

        SketchSolverEvents;


}









// =====================================================
// SketchSolverManager
// =====================================================


export class SketchSolverManager {



    private readonly sketch:

        Sketch;



    private readonly solver:

        Solver2D;





    private readonly events?:

        SketchSolverEvents;





    private undoStack:

        SolverSnapshot[] = [];





    private redoStack:

        SolverSnapshot[] = [];





    private solving = false;









    constructor(

        options:SketchSolverManagerOptions

    ){



        this.sketch =

            options.sketch;



        this.events =

            options.events;



        this.solver =

            new Solver2D();



        this.registerSketch();



    }









    // -------------------------------------------------
    // Initialization
    // -------------------------------------------------


    private registerSketch():

        void{



        for(

            const entity of this.sketch.entities

        ){


            this.solver.addEntity(

                entity

            );


        }





        for(

            const constraint of this.sketch.constraints

        ){


            this.solver.addConstraint(

                constraint

            );


        }



    }









    // -------------------------------------------------
    // Entity Management
    // -------------------------------------------------


    addEntity(

        entity:SketchEntity

    ):void{



        this.saveState();



        this.sketch.addEntity(

            entity

        );



        this.solver.addEntity(

            entity

        );



        this.solve();


    }









    removeEntity(

        entity:SketchEntity

    ):void{



        this.saveState();



        this.sketch.removeEntity(

            entity

        );



        this.solve();


    }









    // -------------------------------------------------
    // Constraint Management
    // -------------------------------------------------


    addConstraint(

        constraint:SketchConstraint

    ):void{



        this.saveState();



        this.sketch.addConstraint(

            constraint

        );



        this.solver.addConstraint(

            constraint

        );



        this.events?.onConstraintAdded?.(

            constraint

        );



        this.solve();


    }









    removeConstraint(

        constraint:SketchConstraint

    ):void{



        this.saveState();



        this.sketch.removeConstraint(

            constraint

        );



        this.solver.removeConstraint(

            constraint

        );



        this.events?.onConstraintRemoved?.(

            constraint

        );



        this.solve();


    }









    // -------------------------------------------------
    // Live Pen Solving
    // -------------------------------------------------


    solve():

        Solver2DResult{



        if(this.solving)

        {


            return {


                success:false,


                error:0,


                iterations:0,


                dof:

                    this.solver

                    .calculateDOF()



            };


        }





        this.solving = true;





        try{



            const result =

                this.solver.solve();





            this.events?.onSolved?.(

                result

            );





            return result;



        }

        catch(error){



            const err =

                error instanceof Error

                ?

                error

                :

                new Error(

                    String(error)

                );





            this.events?.onError?.(

                err

            );





            throw err;



        }

        finally{



            this.solving=false;



        }


    }









    // -------------------------------------------------
    // Pen Drag Update
    // -------------------------------------------------


    updateEntityPosition(

        entity:SketchEntity,

        x:number,

        y:number

    ):void{



        entity.setPosition(

            x,

            y

        );



        this.solve();


    }









    // -------------------------------------------------
    // Drag Transaction
    // -------------------------------------------------


    beginDrag():

        void{


        this.saveState();


    }







    endDrag():

        void{


        this.solve();


    }









    // -------------------------------------------------
    // Undo / Redo
    // -------------------------------------------------


    private saveState():

        void{



        this.undoStack.push(

            this.createSnapshot()

        );



        this.redoStack.length=0;



    }









    undo():

        void{



        const state =

            this.undoStack.pop();



        if(!state)

            return;





        this.redoStack.push(

            this.createSnapshot()

        );



        this.restoreSnapshot(

            state

        );



        this.solve();



    }









    redo():

        void{



        const state =

            this.redoStack.pop();



        if(!state)

            return;





        this.undoStack.push(

            this.createSnapshot()

        );



        this.restoreSnapshot(

            state

        );



        this.solve();



    }









    private createSnapshot():

        SolverSnapshot{


        return {


            entities:

                this.sketch.entities

                .map(

                    e=>e.serialize()

                ),



            constraints:

                this.sketch.constraints

                .map(

                    c=>c.serialize()

                )



        };


    }









    private restoreSnapshot(

        snapshot:SolverSnapshot

    ):void{



        this.sketch.restore(

            snapshot.entities,

            snapshot.constraints

        );



        this.solver.clear();



        this.registerSketch();



    }









    // -------------------------------------------------
    // Analysis
    // -------------------------------------------------


    getDegreesOfFreedom():

        number{


        return this.solver

        .calculateDOF();



    }









    isSolved():

        boolean{


        return this.solver

        .getStatistics()

        .converged;



    }









    getSolver():

        Solver2D{


        return this.solver;


    }









    debugInfo(){


        return {


            solving:

                this.solving,



            undo:

                this.undoStack.length,



            redo:

                this.redoStack.length,



            solver:

                this.solver.debugInfo()



        };


    }



}