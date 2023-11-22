const mysql = require("mysql2");
const { Sequelize } = require('sequelize');
require("dotenv").config();
require("colors");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  host: "45.56.108.221",
  user: "dbuser",
  password: process.env.DB_PASSWORD,
  database: 'fitnessDB',
})

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/fitnessDB`);
// call connect method to console connection infomration to the screen

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database".red, err);
    // throw err
    return;
  }
  console.log("Connected to the database!".blue);
});

module.exports = {connection, sequelize}