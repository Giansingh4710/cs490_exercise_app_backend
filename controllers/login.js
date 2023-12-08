const bcrypt = require("bcrypt");

const { validateEmail } = require("../utils/helper_funcs.js");
const { findUsersByEmail } = require("../dataAccess/user_db.js");
const { createUserJwt } = require("../utils/security.js");

const login = async function (req, res) {
  try {
    if (!validateEmail(req.body.email)) {
      throw new Error(`${req.body.email}: is not valid email format`);
    }

    const [user] = await findUsersByEmail(req.body.email);
    const encryptedPassword = user.password;
    const isMatch = await bcrypt.compare(req.body.password, encryptedPassword);
    if (!isMatch) {
      throw new Error(
        `Password does not match the one with email: ${req.body.email}`,
      );
    }
    const token = createUserJwt(user); // create JWT for the user
    return res.status(200).json({
      message: "User logged in",
      user: { id: user.userID, email: user.email },
      token: token,
    });
  } catch (error) {
    return res.status(404).send({
      error: error.message,
      message: "Unable to login",
    });
  }
};

module.exports = { login };
