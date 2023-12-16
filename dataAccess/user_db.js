const {createPool} = require("../sql_config/database.js");
const {
  getCoachByID_DB
} = require("../dataAccess/coach_db_access.js")

async function findUserByEmail(email) {
  const connection = await createPool().getConnection();
  const query = "SELECT * FROM User WHERE email = ?";
  const [rows, _] = await connection.execute(query, [email]);
  connection.release();
  return rows[0]; // if rows is empty, this will return undefined
}

async function registerAccount_DB({ email, hashedPass }) {
  const connection = await createPool().getConnection();
  const q = "INSERT INTO User (email, password) VALUES (?, ?)";
  console.log("registerAccount_DB");
  const [insertInfoObj, _] = await connection.execute(q, [
    email,
    hashedPass,
  ]);
  console.log(insertInfoObj);
  connection.release();
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

  const connection = await createPool().getConnection();
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

  let res = await connection.execute(query, [
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
  res = await connection.execute(q, [userID, data.goal]);
  if (data.role.toLowerCase() === "Coach".toLowerCase()) {
    const q = "INSERT INTO Coach (userID, cost, specialties) VALUES (?, ?, ?)";
    res = await connection.execute(q, [userID,data.cost, data.specialties]);
  }
  connection.release();
  return res[0];
}

async function getCoachOfUser_DB(userID){
  const connection = await createPool().getConnection();
  const query = "SELECT coachID from User WHERE userID = ?";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();

  if(rows[0].coachID){
    const coachData = await getCoachByID_DB(rows[0].coachID);
    return coachData;
  }
  return null;
}

// TODO: connection.promise() isn't a thing so beginTransaction() and commit() aren't working
async function removeCoach_DB(userID, coachUserID){
  const connection = await createPool().getConnection();
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
  }finally{
    connection.release();
  }
  
}

async function getUserData_DB(userID){
  const query = `
  SELECT
    firstName,
    email,
    lastName,
    activityLevel,
    city,
    DATE_FORMAT(dob, '%Y-%m-%d') AS dob,
    gender,
    height,
    phoneNum,
    state,
    streetAddress,
    weight,
    zipCode,
    role,
    goalType as goal,
    specialties,
    cost
  FROM User
  LEFT JOIN Goal on Goal.userID = User.userID 
  LEFT JOIN Coach ON Coach.userID = User.userID
  WHERE User.userID = ?`;
  const [rows, _] = await connection.promise().query(query, [userID]);
  return rows[0];
}

async function deleteAccount_DB(userID){
  const query = "DELETE FROM User WHERE UserID = ?";
  const [res, _] = await connection.promise().query(query, [userID]);
  return res;
}

module.exports = {
  findUserByEmail,
  registerAccount_DB,
  updateUser,
  getCoachOfUser_DB,
  removeCoach_DB,
  getUserData_DB,
  deleteAccount_DB
};
