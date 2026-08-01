package com.tamercad.core.selection



/**
 * Handles CAD object selection.
 */
class SelectionEngine {



    private val selected =

        mutableListOf<String>()





    fun select(

        id:String

    ){

        if(

            !selected.contains(id)

        ){

            selected.add(id)

        }

    }





    fun remove(

        id:String

    ){

        selected.remove(id)

    }





    fun clear(){

        selected.clear()

    }





    fun getSelected():

            List<String>{

        return selected

    }


}