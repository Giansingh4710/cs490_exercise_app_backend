const {
    getCoachOfUser_DB
} = require("../dataAccess/user_db.js");


async function getCoachOfUser(req, res){
    try{
        const coachData = await getCoachOfUser_DB(req.userID);
        res.status(200);
        res.send(coachData);
    }catch(error){
        res.status(500);
        res.send({error: {
            message: "error accessing db"
        }})
    }
}

module.exports = {
    getCoachOfUser
}