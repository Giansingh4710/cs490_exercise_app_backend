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

async function updateUser(data) {
  /*
    data = {
      "firstName": "BobFirst",
      "lastName": "BobLast",
      "activityLevel": "Moderate Activity",
      "city": "Newark",
      "dob": "2023-12-01",
      "email": "bob52@bob.com",
      "gender": "Male",
      "height": "72",
      "phoneNum": "1234567890",
      "state": "New Jersey",
      "streetAddress": "1 Main st.",
      "weight": "190",
      "zipCode": "07734"
      "goal": "Gain Weight",
      "role": "Client",

      "cost": "", // coach only
      "specialties": "",
    }
  */

  const query = `UPDATE User SET 
        firstName = ?,
        lastName = ?,
        activityLevel = ?,
        city = ?,
        dob = ?,
        gender = ?,
        height = ?,
        phoneNum = ?,
        state = ?,
        streetAddress = ?,
        weight = ?,
        zipCode = ?,
        role = ?
    WHERE email = ?`;

  let res = await connection.promise().query(query, [
    data.firstName,
    data.lastName,
    data.activityLevel,
    data.city,
    data.dob,
    data.gender,
    data.height,
    data.phoneNum,
    data.state,
    data.streetAddress,
    data.weight,
    data.zipCode,
    data.role,
    data.email,
  ]);

  const {userID} = await findUserByEmail(data.email);

  const q = "INSERT INTO Goal (userID, goalType) VALUES (?, ?)";
  res = await connection.promise().query(q, [userID, data.goal]);
  if (data.role.toLowerCase() === "Coach".toLowerCase()) {
    const q = "INSERT INTO Coach (userID, cost, specialties) VALUES (?, ?, ?)";
    res = await connection.promise().query(q, [userID,data.cost, data.specialties]);
  }
  return res[0];
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

async function removeCoach_DB(userID, coachUserID){
  try{
    connection.promise().beginTransaction();
    // remove coachID from user data
    const removeCoachQuery = "UPDATE User SET coachID = null WHERE userID = ?";
    await connection.promise().query(removeCoachQuery, [userID]);

    // delete coach assigned workouts from workout plan
    const deleteAssignedWorkoutQuery = "DELETE FROM WorkoutPlan WHERE userID = ? AND creator='Coach'";
    await connection.promise().query(deleteAssignedWorkoutQuery, [userID]);

    // delete messages with coach
    const deleteMessagesQuery = "DELETE FROM Message WHERE senderID = ? AND receiverID = ? OR senderID = ? AND receiverID = ?";
    await connection.promise().query(deleteMessagesQuery, [userID, coachUserID, coachUserID, userID]);
    connection.commit();
  }catch(error){
    connection.rollback();
    throw new Error('Error removing coach from database');
  }
  
}

module.exports = {
  findUserByEmail,
  createUser,
  updateUser,
  getCoachOfUser_DB,
  removeCoach_DB
};
