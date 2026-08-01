package com.tamercad.core.kernel


import com.tamercad.core.history.HistoryEngine

import com.tamercad.core.commands.CadCommand

import com.tamercad.core.selection.SelectionEngine



/**
 * Main CAD engine coordinator.
 */
class CADKernel {



    val history =

        HistoryEngine()



    val selection =

        SelectionEngine()





    fun execute(

        command:CadCommand

    ){

        history.execute(

            command

        )

    }




    fun undo(){

        history.undo()

    }





    fun redo(){

        history.redo()

    }


}