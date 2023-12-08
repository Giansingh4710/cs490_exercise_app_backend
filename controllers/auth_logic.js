const { findUserByEmail } = require("../dataAccess/user_db.js");
async function authMe(req, res, next) {
  try {
    const { email } = res.locals.user;
    const [user] = await findUserByEmail(email);
    return res.status(200).send({
      user: {
        id: user.userID,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(404).send({
      error: error.message,
      message: "Unable to find user and authMe",
    });
  }
}

module.exports = { authMe };
