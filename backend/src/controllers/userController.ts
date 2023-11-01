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

        const user_id = v4();

        const hashedPwd = await bcrypt.hash(password, 5);

        const query = `INSERT INTO users (user_id, first_name, last_name,email, password) VALUES ('${user_id}', '${first_name}', '${last_name}','${email}', '${hashedPwd}')`;

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
    } catch (error) {
        console.log(error);

        // Send an error response for exceptions
        return res.status(500).json({
            error: error.message || 'An error occurred while processing the request.'
        });
    }
};


export const loginRegister = async(req:Request, res: Response) =>{
    console.log(req.body);
    try {
        const {email, password} = req.body
       
        

        const pool = await mssql.connect(sqlConfig)

        let user = await (await pool.request().input("email", email).input("password", password).execute('loginUser')).recordset
        
        if(user[0]?.email  == email){
            const CorrectPwd = await bcrypt.compare(password, user[0]?.password)

            if(!CorrectPwd){
                return res.status(401).json({
                    message: "Incorrect password"
                })
            }

            const LoginCredentials = user.map(records =>{
                const {email,password, ...rest}=records

                return rest
            })

            console.log(LoginCredentials);

            // dotenv.config()
            const token = jwt.sign(LoginCredentials[0], process.env.SECRET as string, {
                expiresIn: '3600s'
            })

            return res.status(200).json({
                message: "Logged in successfully", token
            })
            
        }else{
            return res.json({
                message: "Email not found"
            })
        }

    } catch (error) {
        return res.json({
            error: error
        })
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