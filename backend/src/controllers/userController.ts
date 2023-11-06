import { Request, Response } from 'express'
import mssql from 'mssql'
import {v4} from 'uuid'
import bcrypt from 'bcrypt'
import { sqlConfig } from '../config/sqlConfig'
import jwt from 'jsonwebtoken'
// import dotenv from 'dotenv'
import { LoginUser } from '../interfaces/user'
import { ExtendedUser } from '../middleware/verifyToken'
import Connection from '../dbhelpers/dbhelpers'
import useragent from 'useragent'
import fs from 'fs';
import handlebars from 'handlebars'
import sendEmail from '../utils/sendEmail'

const dbhelper = new Connection



const templateFilePath = "src/controllers/email-template.hbs"


export const readHTMLFile = (path:string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (error, htmlContent) => {
      if (error) {
        reject(error);
      } else {
        resolve(htmlContent);
      }
    });
  });
};


export const renderEmailTemplate = (template:any, data:any) => {
  const compiledTemplate = handlebars.compile(template);
  return compiledTemplate(data);
};

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name,email, password } = req.body;
        console.log(req.body);

        const checkEmailQuery = `SELECT * FROM users WHERE email = '${email}'`;


        mssql.connect(sqlConfig).then(pool => {
            return pool.request().query(checkEmailQuery);
        }).then(async result => {
            console.log("success", result);

            if (result.recordset.length > 0) {
                console.log("cannot proceed");
                
                return res.status(500).json({error:"User Already Exists"})
            }
            else{
                const user_id = v4();

                const hashedPwd = await bcrypt.hash(password, 5);
        
                const query = `INSERT INTO users (user_id, first_name, last_name,email, password,role) VALUES ('${user_id}', '${first_name}', '${last_name}','${email}', '${hashedPwd}','admin')`;
        
                mssql.connect(sqlConfig).then(pool => {
                    return pool.request().query(query);
                }).then(result => {
                    console.log("success", result);

                    

    // Example user agent string
    const userAgentString = req.headers['user-agent'];

    // Parse the user agent string
    const agent = useragent.parse(userAgentString);

    // Retrieve the browser name
    const browserName = agent.family;

    // Retrieve the operating system
    const operatingSystem = agent.os.toString();

    console.log(userAgentString)
    console.log(operatingSystem)

    readHTMLFile(templateFilePath)
  .then((templateContent) => {
    // Define the data for the template variables
    const templateData = {
        first_name,email,
      browserName,
      operatingSystem,
      
    };

    // Render the email template with the data
    const renderedTemplate = renderEmailTemplate(templateContent, templateData);

    // Send the email
    sendEmail(email, "Welcome", renderedTemplate)
      .then(() => {
        console.log('Email sent successfully');
     
      })
      .catch((error) => {
        console.log('Failed to send email:', error);
      });
  })
  .catch((error) => {
    console.log('Failed to read template file:', error);
  });
        
                  
                 
                }).catch(err => {
                    console.log(err);
        
                  
                    return res.status(500).json({
                        error: err.message || 'An error occurred while registering the user.'
                    });
                });
            }

            
          
            return res.status(200).json({
                message: 'User registered successfully'
            });
        })

       
    } catch (error:any) {
        console.log(error);

        // Send an error response for exceptions
        return res.status(500).json({
            error: error.message || 'An error occurred while processing the request.'
        });
    }
};


export const loginRegister = async(req:Request, res: Response) =>{  try {
    const { email, password } = req.body;
    console.log("sada",req.body);

    const checkUserQuery = `SELECT * FROM users WHERE email = '${email}'`;

    mssql.connect(sqlConfig)
        .then(pool => {
            return pool.request().query(checkUserQuery);
        })
        .then(async result => {
            console.log("success", result);

            if (result.recordset.length === 0) {
                return res.status(401).json({ error: "User not found" });
            } else {
                const user = result.recordset[0];
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) {
                    return res.status(401).json({ error: "Invalid password" });
                }

                const token = jwt.sign(user, process.env.SECRET as string, {
                    expiresIn: '3600s'
                })

                return res.status(200).json({
                    message: 'User logged in successfully',token,user:result.recordset[0] 
                });
            }
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json({
                error: err.message || 'An error occurred while processing the login request.'
            });
        });

} catch (error:any) {
    console.log(error);

    return res.status(500).json({
        error: error.message || 'An error occurred while processing the request.'
    });
}
}

export const getAllUsers = async(req:Request, res:Response)=>{
    try {
        const checkUserQuery = `SELECT * FROM users`;

        mssql.connect(sqlConfig)
        .then(pool => {
            return pool.request().query(checkUserQuery);
        })
        .then(async result => {
            if (result.recordset.length > 0) {
                console.log("success", result);

                return res.status(200).json(result.recordset)

            }

    })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    try {
        const checkUserQuery = `SELECT * FROM users WHERE user_id = '${user_id}'`;
        
        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(checkUserQuery);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const deleteQuery = `DELETE FROM users WHERE user_id = '${user_id}'`;
        await pool.request().query(deleteQuery);

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};


export const getUserProfile = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    try {
        const query = `SELECT * FROM UserProfile WHERE user_id = '${user_id}'`;

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(query);

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = result.recordset[0];

        return res.status(200).json(userProfile);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the user profile' });
    }
};

export const getUsersWithoutProjects = async (req: Request, res: Response) => {
    try {
        const query = 'SELECT * FROM UsersWithoutProjects';

        const pool = await mssql.connect(sqlConfig);
        const result = await pool.request().query(query);

        return res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching users without projects' });
    }
};



export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){


        return res.json({
            info: req.info
        })
    }
}