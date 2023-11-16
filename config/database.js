const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'DB1017490!',
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
