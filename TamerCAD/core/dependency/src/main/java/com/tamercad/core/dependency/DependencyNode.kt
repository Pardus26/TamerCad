package com.tamercad.core.dependency



/**
 * Node in feature dependency graph.
 */
class DependencyNode<T>(


    val value:T


){


    val parents =

        mutableListOf<DependencyNode<T>>()



    val children =

        mutableListOf<DependencyNode<T>>()



}