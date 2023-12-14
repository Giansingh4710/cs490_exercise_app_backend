const {
    getCoachOfUser_DB,
    removeCoach_DB
} = require("../dataAccess/user_db.js");


async function getCoachOfUser(req, res){
    try{
        const coachData = await getCoachOfUser_DB(req.userID);
        res.status(200);
        res.send(coachData);
    }catch(error){
        res.status(500);
        res.send({error: {
            status: 500,
            message: "error accessing db"
        }})
    }
}

async function removeCoach(req, res){
    let errorCode = 500;
    try{
        const coachData = await getCoachOfUser_DB(req.userID);
        if(coachData == null){
            errorCode = 400;
            throw new Error('User does not have a coach')
        }
        await removeCoach_DB(req.userID, coachData.userID);
        res.status(200);
        res.send({message: "Coach removed"})
        
    }catch(error){
        res.status(errorCode);
        res.send({error: {
            status: errorCode,
            message: error.message
        }})

    }
}

module.exports = {
    getCoachOfUser,
    removeCoach
}