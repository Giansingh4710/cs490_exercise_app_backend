const {
    createMessage_DB
} = require("../DataAccess/messages_db.js");

async function storeMessage(req, res){
    try{
        // check if receiver and sender ID is the same
        if(req.body.receiverID === req.userID){
            return res.status(406).send({
                error: {
                    status: 406,
                    message: "ReceiverID and SenderID cannot be the same."
                }
            })
        }
        
        // create message
        createMessage_DB(req.body, req.userID);
        return res.status(201).send({
            message: "Message created."
        })


    }catch(error){
        return res.status(500).send({
            error: {
                status: 500,
                message: "Error accessing database."
            }
        })
    }
}

module.exports = {
    storeMessage
}