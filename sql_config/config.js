// import config dependencies
require("dotenv").config();
require("colors");

// import listening port
const PORT = process.env.PORT ? Number(process.env.PORT) : 1313;

// import SECRET_KEY and bcrypt work factor
const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR
  ? Number(process.env.BCRYPT_WORK_FACTOR)
  : 13;
const SECRET_KEY = process.env.SECRET_KEY;

// create the data base uri (uses environment variables from .env)
function getDatabaseUri() {
  const dbUser = process.env.DB_USER || "dbuser";
  const dbPass = process.env.DB_PASSWORD
    ? encodeURI(process.env.DB_PASSWORD)
    : "password";
  const dbHost = process.env.DB_HOST || "45.56.108.221";
  const dbPort = process.env.DB_PORT || 3306;
  const dbName = process.env.DB_NAME || "fitnessDB";
  // if a database uri is supplied, use that uri
  // otherwise, create a db connection string
  return (
    process.env.DB_URL ||
    `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

// console log the current URI being used and other system info
console.log("FitnessDB Config: ".red);
console.log("PORT: ".blue, PORT);
console.log("FitnessDB URI: ".blue, getDatabaseUri());
console.log("-----");

// module exports
module.exports = {
  PORT,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
