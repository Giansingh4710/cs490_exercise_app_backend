const { getCoachByID_DB } = require("../DataAccess/coach_db_access.js");

async function coachID_exists(ID) {
  const data = await getCoachByID_DB(ID);
  if (data === undefined) {
    return false;
  }
  return true;
}

function validateName(name) {
  const nameRegex = new RegExp("^[A-Za-z .-]{2,32}$");
  return nameRegex.test(name);
}

function validateEmail(email) {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
  );
  return emailRegex.test(email);
}

module.exports = { coachID_exists, validateName, validateEmail };
