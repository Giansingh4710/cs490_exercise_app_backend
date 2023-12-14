const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../dataAccess/user_db.js");
const { SECRET_KEY } = require("../sql_config/database.js");

function getTokenFromHeader(req) {
  if (req.headers?.authorization) {
    const [scheme, token] = req.headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
}

async function requireAuthedUser(req, res, next) {
  let errorStatusCode = 401;
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Access denied. Token is missing.");
    }

    const the_token = getTokenFromHeader(req);
    const { email } = jwt.verify(the_token, SECRET_KEY);
    const user = await findUserByEmail(email);
    if (user === undefined) {
      throw new Error(`User(${email}) does not exist.`);
    }
    req.userID = user.userID;
    res.locals.user = {
      userID: user.userID,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401);
    res.send({
      error: {
        status: errorStatusCode,
        message: error.message,
      },
    });
  }
}

async function fakeAuthedUser(req, res, next) {
  console.log("fakeAuthedUser");
  req.userID = 3;
  next();
}

function createUserJwt(email) {
  return jwt.sign({ email: email }, SECRET_KEY, { expiresIn: "24h" }); //generateToken
}

module.exports = {
  requireAuthedUser,
  fakeAuthedUser,
  createUserJwt,
};
