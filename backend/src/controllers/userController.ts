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

const dbhelper = new Connection
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
        
                  
                    return res.status(200).json({
                        message: 'User registered successfully'
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

       
    } catch (error) {
        console.log(error);

        // Send an error response for exceptions
        return res.status(500).json({
            error: error.message || 'An error occurred while processing the request.'
        });
    }
};


export const loginRegister = async(req:Request, res: Response) =>{  try {
    const { email, password } = req.body;
    console.log(req.body);

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
                    message: 'User logged in successfully',token
                });
            }
        })
        .catch(err => {
            console.log(err);

            return res.status(500).json({
                error: err.message || 'An error occurred while processing the login request.'
            });
        });

} catch (error) {
    console.log(error);

    return res.status(500).json({
        error: error.message || 'An error occurred while processing the request.'
    });
}
}

export const getAllUsers = async(req:Request, res:Response)=>{
    try {

        const pool = await mssql.connect(sqlConfig)

        let users = (await pool.request().execute('fetchAllUsers')).recordset

        return res.status(200).json({
            users: users
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

export const getUserProfile = async(req:Request, res:Response)=>{
    try {

        const userID = req.params.id;

        let user = dbhelper.execute('fetchUserProfile', {
                        userID
        })

        return res.status(200).json({
            user
        })
        
    } catch (error) {
        return res.json({
            error: error
        })
    }
}


export const checkUserDetails = async (req:ExtendedUser, res:Response)=>{
    
    if(req.info){


        return res.json({
            info: req.info
        })
    }
}