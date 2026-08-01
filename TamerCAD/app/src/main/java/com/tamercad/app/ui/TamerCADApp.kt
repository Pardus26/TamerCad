package com.tamercad.app.ui


import androidx.compose.runtime.Composable


import androidx.navigation.compose.NavHost

import androidx.navigation.compose.rememberNavController


import androidx.navigation.compose.composable



import com.tamercad.feature.home.HomeScreen

import com.tamercad.feature.editor.EditorScreen



@Composable
fun TamerCADApp(){


    val navController =

        rememberNavController()



    NavHost(

        navController = navController,

        startDestination = "home"

    ){


        composable(
            "home"
        ){

            HomeScreen(

                openEditor = {

                    navController.navigate(
                        "editor"
                    )

                }

            )

        }



        composable(
            "editor"
        ){

            EditorScreen()

        }


    }


}