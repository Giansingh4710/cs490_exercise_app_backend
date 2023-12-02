const jwt = require("jsonwebtoken");
const ClientService = require("../Services/ClientService.js");

const verifyToken = async (req, res, next) => {
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
};

module.exports = { verifyToken };
