const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function createMessage_DB(messageData, senderID){

    const query = "INSERT INTO Message(senderID, receiverID, Content) VALUES(?, ?, ?)";
    const res = await connection.promise().query(query, [senderID, messageData.receiverID, messageData.content])
    return res[0];
}

async function getMessages_DB(receiverID, senderID, limit, offset){
    const query = "SELECT content, created, senderID, receiverID FROM Message WHERE senderID=? AND receiverID=? OR senderID=? AND receiverID=? ORDER BY Created ASC LIMIT ? OFFSET ?;"
    // might need to format date and time for frontend
    const res = await connection.promise().query(query, [senderID, receiverID, receiverID, senderID ,limit, offset])
    return res[0];
}


module.exports = {
    createMessage_DB,
    getMessages_DB
}