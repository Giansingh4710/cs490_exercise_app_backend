// import database, bcrypt, BCRYPT_WORK_FACTOR, and errors
const db = require("../config/database");
const { BadRequestError } = require("../utils/errors");

// User class to authenticate users
class User {
  // returns a public a user object that does not have password
  static makePublicUser(user) {
    return {
      id: user.UserID,
      email: user.Email,
    };
  }

  static fetchUserByEmail(email, callback) {
    // If no email was provided to check for existing user, invoke the callback with an error
    if (!email) {
      return callback(new BadRequestError("No email provided"));
    }

    // Lowercase the email of the user
    const lowercaseEmail = email.toLowerCase();

    // Make a query to the database to find a matching email to find the user
    const query = `SELECT * FROM User WHERE email = ?`;

    db.query(query, [lowercaseEmail], (err, results) => {
      if (err) {
        // Handle any database errors
        return callback(err);
      }
      if (results.length === 0) {
        // Handle the case where no user is found
        return callback(null, null);
      }
      // Return the existing user
      const user = results[0];
      return callback(null, user);
    });
  }
}

module.exports = User;
