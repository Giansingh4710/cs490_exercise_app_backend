const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getCoachByID_DB(coachID) {
  const query =
    "SELECT c.CoachID, u.FirstName, u.LastName, u.City, u.State, c.Specialties FROM Coach c JOIN User u ON c.UserID = u.UserID WHERE c.coachID = ?";
  const res = await connection.promise().query(query, [coachID]);
  return res[0][0];
}

async function getAllCoaches_DB() {
  const query =
    "SELECT c.CoachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u WHERE u.UserID = c.CoachID GROUP BY c.CoachID ORDER BY c.CoachID";
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function getSpecializations_DB() {
  const query =
    `SELECT DISTINCT specialties FROM Coach`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}


async function getCities_DB() {
  const query =
    `SELECT State, GROUP_CONCAT(DISTINCT city SEPARATOR ', ') AS Cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function searchByName_DB(name) {
  const query = `SELECT c.CoachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.UserID = c.CoachID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%' 
      GROUP BY c.CoachID ORDER BY c.CoachID`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function searchByAll_DB(name, specialty, maxPrice, state, city) {
  const query = `SELECT c.CoachID, u.firstName, u.lastName, u.city, u.state, c.specialties, c.cost
  FROM Coach c 
  INNER JOIN User u ON u.UserID = c.CoachID 
  WHERE (CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%') AND 
      (c.specialties LIKE '%${specialty}%') AND 
      (c.cost <= '${maxPrice}') AND 
      (u.state LIKE '%${state}%') AND 
      (u.city LIKE '%${city}%') 
  GROUP BY c.CoachID 
  ORDER BY u.firstName;`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function getClientsOfCoach_DB(coachID) {
  const query =  "SELECT UserID, FirstName, LastName from User WHERE CoachID = ?"
  const res = await connection.promise().query(query,[coachID]);
  return res[0];
}

module.exports = {
  getCoachByID_DB,
  getAllCoaches_DB,
  getCities_DB,
  getSpecializations_DB,
  searchByName_DB,
  searchByAll_DB,
  getClientsOfCoach_DB,
};