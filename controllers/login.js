const bcrypt = require("bcrypt");

const { validateEmail } = require("../utils/helper_funcs.js");
const { findUserByEmail } = require("../dataAccess/user_db.js");
const { createUserJwt } = require("../utils/security.js");

const login = async function (req, res) {
  let errorStatus = 404;
  try {
    if (!validateEmail(req.body.email)) {
      errorStatus = 400;
      throw new Error(`${req.body.email}: is not valid email format`);
    }

    const user = await findUserByEmail(req.body.email);
    const encryptedPassword = user.password;
    const isMatch = await bcrypt.compare(req.body.password, encryptedPassword);
    if (!isMatch) {
      errorStatus = 401;
      throw new Error(
        `Password does not match the one with email: ${req.body.email}`,
      );
    }
    const token = createUserJwt(user.email); // create JWT for the user
    res.status(200);
    res.send({
      message: "User logged in",
      user: { id: user.userID, email: user.email, role: user.role.toLowerCase() },
      token: token,
    });
  } catch (error) {
    res.status(errorStatus);
    res.send({
      status: errorStatus,
      error: error.message,
      message: "Unable to login",
    });
  }
};

module.exports = { login };
