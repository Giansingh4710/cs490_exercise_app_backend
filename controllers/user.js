const {
    getCoachOfUser_DB,
    removeCoach_DB,
    getUserData_DB,
    deleteAccount_DB
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

async function getUserData(req, res){
    try{
        const userData = await getUserData_DB(req.userID);
        res.status(200);
        res.send(userData);
    }catch(error){
        res.status(500);
        res.send({
            error: {
                status: 500,
                message: "Error accessing user data",
                details: "Error accessing database"
            }
        })
    }
}

async function deleteAccount(req, res){
    try{
        await deleteAccount_DB(req.userID);
        res.status(200);
        res.send({
            message: "Account deleted"
        })
    }catch(error){
        res.status(500);
        res.send({
            error: {
                status: 500,
                message: "Error deleting account"
            }
        })
    }
}

module.exports = {
    getCoachOfUser,
    removeCoach,
    getUserData,
    deleteAccount
}