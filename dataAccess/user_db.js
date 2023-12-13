const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

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

module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
};
