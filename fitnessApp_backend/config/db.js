import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;