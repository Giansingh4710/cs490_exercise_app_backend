const { pool } = require("../sql_config/database.js");

async function createMessage_DB(messageData, senderID) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO Message(senderID, receiverID, Content) VALUES(?, ?, ?)";
  const [rows, _] = await connection.execute(query, [
    senderID,
    messageData.receiverID,
    messageData.content,
  ]);
  connection.release();
  return rows;
}

async function getMessages_DB(receiverID, senderID, limit, offset) {
  const connection = await pool.getConnection();
  const query = "SELECT content, created, senderID, receiverID FROM Message WHERE (senderID=? AND receiverID=?) OR (senderID=? AND receiverID=?) ORDER BY created ASC";
  // might need to format date and time for frontend
  const [rows, _] = await connection.execute(query, [senderID, receiverID, receiverID, senderID]);
  connection.release();
  return rows;
}

module.exports = {
  createMessage_DB,
  getMessages_DB,
};
