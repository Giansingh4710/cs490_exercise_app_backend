const {
  findUserByEmail,
  createUser,
  updateUser,
} = require("../dataAccess/user_db");
const { createUserJwt } = require("../utils/security.js");
const { BCRYPT_WORK_FACTOR } = require("../sql_config/database.js");
const bcrypt = require("bcrypt");
const { validateEmail, calculateAge } = require("../utils/helper_funcs.js");

async function registerAccount(req, res) {
  let errorStatusCode = 400;
  try {
    if (!validateEmail(req.body.email)) {
      errorStatusCode = 422;
      throw new Error(`${req.body.email}: is not valid email format`);
    }

    const user = await findUserByEmail(req.body.email);
    if (user !== undefined) {
      errorStatusCode = 500;
      throw new Error(`${req.body.email}: is already registered`);
    }

    const hashedPass = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);
    const insertInfoObj = await createUser({
      email: req.body.email,
      hashedPass: hashedPass,
    });
    const userID = insertInfoObj.insertId;

    const token = createUserJwt(req.body.email); // adding user data to res.locals.user for frontend
    res.status(201);
    res.send({
      user: {
        id: userID,
        email: req.body.email,
        role: null,
      },
      token: token,
      message: "User registered",
    });
  } catch (error) {
    res.status(errorStatusCode);
    res.send({
      error: error.message,
      message: "Unable to create user and registerAccount",
    });
  }
}

async function storeSurvey(req, res) {
  let errorStatusCode = 404;
  try {
    const age = calculateAge(req.body.dob);
    if (age < 8) {
      errorStatusCode = 403;
      throw new Error(`${age}: is less than 8. Too young to register`);
    }
    const updateResult = await updateUser(req.body);
    // may need to send user data like role back
    res.status(200);
    res.send({
      message: "Updated: User survey information updated successfully",
      updateResult: updateResult,
    });
  } catch (error) {
    res.status(errorStatusCode);
    res.send({
      error: {
        status: errorStatusCode,
        message: error.message,
        details: "Unable to update user and storeSurvey",
      },
    });
  }
}

module.exports = { storeSurvey, registerAccount };
