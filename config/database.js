const mysql = require("mysql2");
require("dotenv").config();
require("colors");

const connection = mysql.createConnection({
  host: "45.56.108.221",
  user: "dbuser",
  password: process.env.DB_PASSWORD,
  database: "fitnessDB",
});
// call connect method to console connection infomration to the screen
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database".red, err);
    // throw err
    return;
  }
  console.log("Connected to the database!".blue);
});

module.exports = connection;
