import { Request, Response } from 'express'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
// import Connection from '../dbhelpers/dbhelpers'



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
