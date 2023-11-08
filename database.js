require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: '45.56.108.221',
  user: 'dbuser',
  password: process.env.DB_PASSWORD,
  database: 'test',
})

connection.connect((err) => {
  if (err) throw err
  // console.log('Database connected')
})
module.exports = connection
