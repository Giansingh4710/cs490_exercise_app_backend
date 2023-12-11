async function authMe(req, res, next) {
  try {
    const user = res.locals.user;
    return res.status(200).send({
      user: {
        id: user.userID,
        email: user.email,
        role: user.role
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