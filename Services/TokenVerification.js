const jwt = require("jsonwebtoken");
const ClientService = require("../Services/ClientService.js");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Token is missing.",
    });
  }

  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY,
    );
    const email = decoded["email"];
    req.UserID = await ClientService.getUserIDByEmail(email);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token.", "error": error });
  }
}

async function fakeVerifyToken(req, res, next) {
  //for testing purposes, to test out routes that require a token
  try {
    req.UserID = 1;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token.", "error": error });
  }
}

module.exports = { verifyToken, fakeVerifyToken };
