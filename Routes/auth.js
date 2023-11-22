const express = require("express");
const router = express.Router();
const User = require("../models/user");
const security = require("../middleware/security");

// get request to authorize the identity of the user
router.get("/me", security.requireAuthenticatedUser, (req, res, next) => {
  // Get the email of the user from the local server
  const { email } = res.locals.user;
  // Extract the user from the database using their email
  User.fetchUserByEmail(email, (err, user) => {
    if (err) {
      return next(err);
    }

    // public information of the user
    const publicUser = User.makePublicUser(user);

    // return the authorized user
    return res.status(200).json({ user: publicUser });
  });
});

// export routes
module.exports = router;
