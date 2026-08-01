package com.tamercad.core.constraints



/**
 * Solves sketch constraints.
 */
class ConstraintSolver {


    private val constraints =

        mutableListOf<Constraint>()




    fun add(

        constraint:Constraint

    ){

        constraints.add(

            constraint

        )

    }





    fun solve(){


        constraints.forEach {


            it.solve()


        }


    }



}