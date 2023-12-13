const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();
const {
  getCoachByID_DB
} = require("../dataAccess/coach_db_access.js")

async function findUserByEmail(email) {
  const query = "SELECT * FROM User WHERE email = ?";
  const [rows, _] = await connection.promise().query(query, [email]);
  return rows[0]; // if rows is empty, this will return undefined
}

async function createUser({ email, hashedPass }) {
  const q = "INSERT INTO User (email, password) VALUES (?, ?)";
  const [insertInfoObj, _] = await connection.promise().query(q, [
    email,
    hashedPass,
  ]);
  return insertInfoObj;
}

async function updateUser(data, email) {
  const allPossibleFields = [
    "firstName",
    "lastName",
    // "email",
    "phoneNum",
    "dob",
    "gender",
    "weight",
    "height",
    "role",
    "activityLevel",
    "goal",
    "streetAddress",
    "city",
    "state",
    "zipCode",

    "coachID",
  ];
  let query = "UPDATE User SET";
  const usedFields = [];
  for (const field of allPossibleFields) {
    if (data[field]) {
      query += ` ${field} = ?,`;
      usedFields.push(data[field]);
    }
  }
  if (usedFields.length === 0) {
    throw new Error("No data given to updateUser in DB");
  }
  query = query.slice(0, -1); // remove the last comma
  query += " WHERE email = ?";
  const [rows, _] = await connection.promise().query(query, [
    ...usedFields,
    email,
  ]);
  return rows;
}

async function getCoachOfUser_DB(userID){
  const query = "SELECT coachID from User WHERE userID = ?";
  const [rows, _] = await connection.promise().query(query, [userID]);
  if(rows[0].coachID){
    const coachData = await getCoachByID_DB(rows[0].coachID);
    return coachData;
  }
  return null;
}

module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
  getCoachOfUser_DB
};
