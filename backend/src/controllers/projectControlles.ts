import { Request, Response } from 'express'
import mssql from 'mssql'
import { sqlConfig } from '../config/sqlConfig'
import Connection from '../dbhelpers/dbhelpers'

const dbhelper = new Connection


export const createProject = async (req: Request, res: Response) => {
    const { title, description,user_id } = req.body;

    try {
    
        const insertQuery = `
            INSERT INTO projects (title, description,user_id)
            VALUES ('${title}', '${description}','${user_id}')
        `;

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(insertQuery);

        return res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while creating the project' });
    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM projects'; 
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(query);

        const projects = result.recordset;

        return res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the projects' });
    }
};

export const getProject = async (req: Request, res: Response) => {
    const project_id = req.params.project_id;

    try {
        const query = `SELECT * FROM projects WHERE project_id = '${project_id}'`; // Adjust the query according to your database schema

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = result.recordset[0];

        return res.status(200).json(project);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the project' });
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const project_id = req.params.project_id;
    const { title, description } = req.body;

    try {
        // Check if the project exists before attempting the update
        const checkProjectQuery = `SELECT * FROM projects WHERE project_id = '${project_id}'`;
        
        const pool = await mssql.connect(sqlConfig);
        const checkResult = await pool.request().query(checkProjectQuery);

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the project information
        const updateQuery = `
            UPDATE projects 
            SET title = '${title}', description = '${description}' 
            WHERE project_id = '${project_id}'
        `;
        
        const updateResult = await pool.request().query(updateQuery);

        return res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while updating the project' });
    }
};

   


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

export const deleteProject = async (req: Request, res: Response) => {
    const project_id = req.params.project_id;

    try {
        const query = `DELETE FROM projects WHERE project_id = '${project_id}'`; // Adjust the query according to your database schema

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(query);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the project' });
    }
};