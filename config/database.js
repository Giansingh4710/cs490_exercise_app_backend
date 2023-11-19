const mysql = require('mysql2')
require('dotenv').config()
const { Sequelize } = require('sequelize');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'fitnessDB',
})

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/fitnessDB`);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err)
    // throw err
    return
  }
  console.log('Connected to the database!')
})

module.exports = {connection, sequelize}
