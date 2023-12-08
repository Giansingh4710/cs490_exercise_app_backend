const {
    createMessage_DB,
    getMessages_DB
} = require("../DataAccess/messages_db.js");

async function storeMessage(req, res){
    try{
        // check if receiver and sender ID is the same, user should not be able to send messages to themselves
        if(req.body.receiverID === req.userID){
            return res.status(406).send({
                error: {
                    status: 406,
                    message: "ReceiverID and SenderID cannot be the same."
                }
            })
        }
    
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

async function getMessages(req, res){

    // set default values for limit and offset
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    
    try{
        const messages = await getMessages_DB(req.params.userID, req.userID, limit, offset);
        return res.status(200).send(messages);
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
    storeMessage,
    getMessages
}