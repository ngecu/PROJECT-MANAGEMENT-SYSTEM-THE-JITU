import { Request, Response } from 'express'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
import Connection from '../dbhelpers/dbhelpers'

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