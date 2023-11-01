import dotenv from 'dotenv'
import mssql from 'mssql'
dotenv.config()

export const sqlConfig = {
    user : process.env.DB_USER as string,
    password: process.env.DB_PWD as string,
    database: process.env.DB_NAME as string,
    server : 'DESKTOP-E7G5E3R\\MSSQLSERVER01',
    port: 1433,
    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

async function TestConnection() {
    const pool=await mssql.connect(sqlConfig)
 
 
if (pool.connected){
    console.log('conneted to database')
 
}
 
}
TestConnection()
 