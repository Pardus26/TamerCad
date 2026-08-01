package com.tamercad.feature.home


import androidx.compose.material3.Button

import androidx.compose.material3.Text

import androidx.compose.runtime.Composable



@Composable
fun HomeScreen(

    openEditor:()->Unit

){


    Button(

        onClick = openEditor

    ){


        Text(
            "Yeni CAD Projesi"
        )


    }


}