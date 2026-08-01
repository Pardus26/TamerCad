package com.tamercad.data.repository


import com.tamercad.domain.model.Project

import com.tamercad.domain.repository.ProjectRepository



class ProjectRepositoryImpl:

    ProjectRepository {



    private val projects =

        mutableListOf<Project>()



    override suspend fun getProjects():

            List<Project>{


        return projects


    }



    override suspend fun saveProject(

        project:Project

    ){


        projects.add(

            project

        )


    }


}