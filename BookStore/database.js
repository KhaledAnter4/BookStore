import mysql from 'mysql2'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'books' 
}) .promise()

const result = await pool.query("Select * from book_name")
