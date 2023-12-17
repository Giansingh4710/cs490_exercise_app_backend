const mysql = require("mysql2/promise");

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

function createPool() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "a9fc6ef13j",
    database: "fitnessDB",

    waitForConnections: true,
    connectionLimit: 100, // Adjust as needed based on your requirements
    queueLimit: 0, //set higher to prevent errors
  });

  pool.on("error", (err) => {
    console.error("Database pool error:", err);
  });

  pool.on("release", (connection) => {
    console.log("Connection %d released", connection.threadId);
  });

  return pool;
}

module.exports = {
  createPool,
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};
