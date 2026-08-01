package com.tamercad.domain.repository


import com.tamercad.domain.model.Project



interface ProjectRepository {


    suspend fun getProjects():

            List<Project>



    suspend fun saveProject(

        project:Project

    )


}