package com.tamercad.feature.editor


import androidx.compose.foundation.Canvas

import androidx.compose.foundation.layout.fillMaxSize

import androidx.compose.runtime.Composable

import androidx.compose.ui.Modifier



@Composable
fun EditorScreen(){


    Canvas(

        modifier =
            Modifier.fillMaxSize()

    ){



        drawCircle(

            radius = 50f,

            center = center

        )


    }


}