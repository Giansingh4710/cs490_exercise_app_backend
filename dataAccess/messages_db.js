const { connection } = require("../sql_config/database");

async function createMessage_DB(messageData, senderID){

    const query = "INSERT INTO Message(SenderID, ReceiverID, Content) VALUES(?, ?, ?)";
    const res = await connection.promise().query(query, [senderID, messageData.receiverID, messageData.content])
    return res[0];
}


module.exports = {
    createMessage_DB
}