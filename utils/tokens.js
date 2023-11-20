// import JSON webt token packge and the SECRET_KEY from config file
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

// create a token based on the provided data from user and secret key
// tokens will expire every 24 hours
const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });

// create a new user token given the information of the user
const createUserJwt = (user) => {
  const payload = {
    email: user.email,
  };

  return generateToken(payload);
};

// validate the json token and verify it exists when combined with calls from security middleware
// if an error occurs, return nothing
// if verified, return the decoded token
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return {};
  }
};

module.exports = {
  generateToken,
  createUserJwt,
  validateToken,
};
