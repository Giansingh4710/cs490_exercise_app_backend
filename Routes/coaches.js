const { connection } = require("../sql_config/database.js");
const express = require("express");
const router = express.Router();

const { getCoachByID } = require("../Controllers/coach.js");

router.get("/:CoachID", getCoachByID);

router.get("/api/coaches", (req, res) => {
  const query = `SELECT coach.CoachID, user.firstName, user.lastName
                  FROM coach 
                  INNER JOIN user WHERE user.UserID = coach.CoachID 
                  GROUP BY coach.CoachID ORDER BY coach.CoachID`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({
        error: "Error retrieving coaches from the database.",
      });
      return;
    }
    res.json(results);
  });
});

router.get("/api/coaches-search-name", (req, res) => {
  const searchTerm = req.query.name || "";
  const query = `SELECT coach.CoachID, user.firstName, user.lastName 
                   FROM coach 
                   INNER JOIN user ON user.UserID = coach.CoachID 
                   WHERE CONCAT(user.firstName, ' ', user.lastName) LIKE '%${searchTerm}%' 
                   GROUP BY coach.CoachID ORDER BY coach.CoachID`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({
        error: "Error retrieving coaches from the database.",
      });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
