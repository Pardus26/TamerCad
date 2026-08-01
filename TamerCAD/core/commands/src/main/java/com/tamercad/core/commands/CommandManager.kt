package com.tamercad.core.commands


/**
 * Handles CAD command execution.
 */
class CommandManager {



    private val commands =

        mutableListOf<CadCommand>()



    private var index = -1





    fun execute(

        command:CadCommand

    ){


        while(

            commands.size >

            index + 1

        ){

            commands.removeLast()

        }



        command.execute()



        commands.add(

            command

        )



        index++

    }





    fun undo(){


        if(index < 0)

            return



        commands[index]

            .undo()



        index--


    }





    fun redo(){


        if(

            index + 1 >=

            commands.size

        )

            return



        index++



        commands[index]

            .execute()


    }




    fun clear(){


        commands.clear()


        index=-1


    }


}