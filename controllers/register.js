const {
  findUsersByEmail,
  createUser,
  updateUser,
} = require("../dataAccess/user_db");
const { createUserJwt } = require("../utils/security.js");
const { BCRYPT_WORK_FACTOR } = require("../sql_config/database.js");
const bcrypt = require("bcrypt");
const { validateName, validateEmail } = require("../utils/helper_funcs.js");

async function registerAccount(req, res) {
  let errorStatusCode = 400;
  try {
    if (!validateEmail(req.body.email)) {
      errorStatusCode = 422;
      throw new Error(`${req.body.email}: is not valid email format`);
    }

    const rows = await findUsersByEmail(req.body.email);
    if (rows.length > 0) {
      errorStatusCode = 500;
      throw new Error(`${req.body.email}: is already registered`);
    }

    const hashedPass = await bcrypt.hash(req.body.password, BCRYPT_WORK_FACTOR);
    const insertInfoObj = await createUser({
      email: req.body.email,
      hashedPass: hashedPass,
    });
    // adding user data to res.locals.user for frontend
    const newUserData = await findUsersByEmail(req.body.email);
    const token = createUserJwt(req.body.email); // generate a new JWT for the user
    return res.status(201).send(
      {
        user: {
          id: newUserData.userID,
          email: newUserData.email,
          role: newUserData.role
        },
        token: token,
        message: "User registered"
      }
      );

  } catch (error) {
    res.status(errorStatusCode);
    res.send({
      error: error.message,
      message: "Unable to create user and registerAccount",
    });
  }
}

async function storeSurvey(req, res) {
  try {
    const updateResult = await updateUser(req.body, req.body.email); //might be wrong. Not tested
    res.status(200);
    res.send({
      message: "Updated: User survey information updated successfully",
      updateResult: updateResult,
    });
  } catch (error) {
    res.status(404);
    res.send({
      error: error.message,
      message: "Unable to update user and storeSurvey",
    });
  }
}

module.exports = { storeSurvey, registerAccount };
