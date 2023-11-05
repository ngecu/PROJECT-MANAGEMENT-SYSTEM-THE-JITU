import { Request, Response } from 'express'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
import Connection from '../dbhelpers/dbhelpers'
import { projectinterface } from '../interfaces/project'

const dbhelper = new Connection


export const getAllProjects = async(req:Request, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let projects = (await pool.request().execute('fetchAllProjects')).recordset

        return res.status(200).json({
          projects: projects
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}


export const getMyProjects = async(req:Request, res:Response)=>{
    try {

        const userID = req.params.id;
        
        let projects = dbhelper.execute('fetchMyProjects', {
                        userID
        })


        return res.status(200).json({
          projects: projects
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const editProject = async (req: Request, res: Response) => {
    try {
      const projectData: projectinterface = req.body;
      const projectID = req.params.id;
      const pool = await mssql.connect(sqlConfig);
  
      await pool.request()
      .input('projectID', mssql.VarChar, projectID)
      .input('dueDate', mssql.Date, projectData.dueDate)
      .input('projectName', mssql.VarChar, projectData.project_name)
      .input('projectDescription', mssql.VarChar, projectData.project_description)
        .execute('editProject');
  
      return res.status(200).json({ message: 'Project updated successfully' })
    } catch (error) {
      return res.json({ error })
    }
}



export const addProject = async (req: Request, res: Response) => {
    try {
      const projectData: projectinterface = req.body;
      const pool = await mssql.connect(sqlConfig);
  
      await pool.request()
        .input('project_id', mssql.VarChar, projectData.project_id)
        .input('project_name', mssql.VarChar, projectData.project_name)
        .input('dueDate', mssql.Date, projectData.dueDate)

        .input('project_description', mssql.VarChar, projectData.project_description)
        .input('project_status', mssql.VarChar, projectData.project_status)
        .execute('addProject')
  
      return res.status(201).json({ message: 'Project added successfully' });
    } catch (error) {
      return res.json({ error })
    }
  }
  