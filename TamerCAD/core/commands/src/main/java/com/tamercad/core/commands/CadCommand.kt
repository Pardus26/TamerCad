package com.tamercad.core.commands


/**
 * Base CAD command.
 *
 * Every modification inside the CAD engine
 * must be represented as a command.
 */
interface CadCommand {


    /**
     * Executes command.
     */
    fun execute()



    /**
     * Reverts command.
     */
    fun undo()



    /**
     * Command name for debugging.
     */
    fun name():String


}