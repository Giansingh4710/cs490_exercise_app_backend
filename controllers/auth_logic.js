const { findUsersByEmail } = require("../dataAccess/user_db.js");
const { getCoachIDFromUserID_DB } = require("../dataAccess/coach_db_access.js")
async function authMe(req, res, next) {
  try {
    let userRole = null;
    const { email } = res.locals.user;
    const [user] = await findUsersByEmail(email);

    // setting role of user
    if(email == "admin@fitfusion.com"){
      userRole = "admin";
    }else{
      const coachData = getCoachIDFromUserID_DB(user.userID);
      if(coachData.length == 0){
        userRole = "user"
      }else{
        userRole = "coach"
      }
    }

    return res.status(200).send({
      user: {
        id: user.userID,
        email: user.email,
        role: userRole
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
