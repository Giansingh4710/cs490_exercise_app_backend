const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection({
  host: 'localhost',
   user: 'root',
   password: process.env.DB_PASSWORD,
   database: 'fitnessDB',
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err)
    // throw err
    return
  }
  console.log('Connected to the database!')
})

module.exports = connection
