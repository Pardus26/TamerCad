package com.tamercad.core.history


import com.tamercad.core.commands.CommandManager

import com.tamercad.core.commands.CadCommand



/**
 * CAD undo redo transaction system.
 */
class HistoryEngine {


    private val manager =

        CommandManager()





    fun execute(

        command:CadCommand

    ){

        manager.execute(

            command

        )

    }





    fun undo(){

        manager.undo()

    }





    fun redo(){

        manager.redo()

    }





    fun clear(){

        manager.clear()

    }


}