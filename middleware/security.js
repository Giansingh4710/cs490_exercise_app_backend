// import jwt, error handling and security key
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/errors");
const { SECRET_KEY } = require("../config/config");

// extract the json token from request header
// split the authorization header and assure that the header is Bearer and extract the token
// if not, then return undefined
const jwtFrom = ({ headers }) => {
  if (headers?.authorization) {
    const [scheme, token] = headers.authorization.split(" ");
    if (scheme.trim() === "Bearer") {
      return token;
    }
  }
  return undefined;
};

// attach the user to the response object
// if token can be verified and valid user is using the key,
//      token can be accessed through res.locals
// if not
//      return error
const extractUserFromJwt = (req, res, next) => {
  try {
    const token = jwtFrom(req);
    if (token) {
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (error) {
    return next();
  }
};

// verify an authorized user exists
// if the user does not exists on res.locals and if that user email does not exists,
//      Unauthorized error and user will not be allowed to continue
const requireAuthenticatedUser = (req, res, next) => {
  try {
    const { user } = res.locals;
    if (!user?.email) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  extractUserFromJwt,
  requireAuthenticatedUser,
};
