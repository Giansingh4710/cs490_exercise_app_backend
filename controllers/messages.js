const {
    createMessage_DB,
    getMessages_DB
} = require("../dataAccess/messages_db.js");

async function storeMessage(req, res){
    try{
        // check if receiver and sender ID is the same, user should not be able to send messages to themselves
        if(req.body.receiverID === req.userID){
            throw new Error('ReceiverID and SenderID cannot be the same.');
        }
        createMessage_DB(req.body, req.userID);
        res.status(201)
        return res.send({
            message: "Message created."
        })
    }catch(error){
        res.status(500);
        return res.send({
            error: {
                status: 500,
                message: error.message,
            }
        })
    }
}

async function getMessages(req, res){
    // set default values for limit and offset
    const limit = req.query.limit ? parseInt(req.query.limit) : 30;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    if(limit < 0 || offset < 0){
        return res.status(400).send({
            error: {
                status: 400,
                message: "Limit and offset must be nonnegative"
            }
        })
    }
    
    // try{
        console.log(req.params.userID);
        console.log(req.userID);
        const messages = await getMessages_DB(req.params.userID, req.userID, limit, offset);
        return res.status(200).send(messages);
    // }catch(error){
    //     return res.status(500).send({
    //         error: {
    //             status: 500,
    //             message: "Error accessing database."
    //         }
    //     })
    // }
}

module.exports = {
    storeMessage,
    getMessages
}