const mysql = require("mysql2");
require("dotenv").config();
require("colors");

function getDatabaseUri() {
  const dbUser = process.env.DB_USER || "dbuser";
  const dbPass = process.env.DB_PASSWORD
    ? encodeURI(process.env.DB_PASSWORD)
    : "password";
  const dbHost = process.env.DB_HOST || "45.56.108.221";
  const dbPort = process.env.DB_PORT || 3306;
  const dbName = process.env.DB_NAME || "fitnessDB";
  return (
    process.env.DB_URL ||
    `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

function print_db_info() {
  console.log("FitnessDB Config: ".red);
  console.log("PORT: ".blue, PORT);
  console.log("FitnessDB URI: ".blue, getDatabaseUri());
  console.log("-----");
}

const PORT = process.env.PORT ? Number(process.env.PORT) : 1313;
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR
  ? Number(process.env.BCRYPT_WORK_FACTOR)
  : 13;
const SECRET_KEY = process.env.SECRET_KEY;

function createConnection() {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "fitnessDB",

    // //for jest testing
    // charset: "utf8mb4",
    // collation: "utf8mb4_unicode_ci",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database".red, err);
      throw err;
    }
    print_db_info();
  });
  return connection;
}

module.exports = {
  createConnection,
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
