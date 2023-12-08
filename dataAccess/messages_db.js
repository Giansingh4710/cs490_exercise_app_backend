const { connection } = require("../sql_config/database");

async function createMessage_DB(messageData, senderID){

    const query = "INSERT INTO Message(SenderID, ReceiverID, Content) VALUES(?, ?, ?)";
    const res = await connection.promise().query(query, [senderID, messageData.receiverID, messageData.content])
    return res[0];
}

async function getMessages_DB(receiverID, senderID, limit, offset){
    const query = "SELECT Content, Created FROM Message WHERE SenderID=? AND ReceiverID=? ORDER BY Created DESC LIMIT ? OFFSET ?;"
    // might need to format date and time for frontend
    const res = await connection.promise().query(query, [senderID, receiverID, limit, offset])
    return res[0];
}


module.exports = {
    createMessage_DB,
    getMessages_DB
}