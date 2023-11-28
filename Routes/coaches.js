const connection = require('../config/database')

module.exports = (app) => {

    app.get('/api/coaches', (req, res) => {
        const query = `SELECT coach.CoachID, user.firstName, user.lastName
                      FROM coach 
                      INNER JOIN user WHERE user.UserID = coach.CoachID 
                      GROUP BY coach.CoachID ORDER BY coach.CoachID`
    
        connection.query(query, (err, results) => {
            if(err) {
                console.error('Error executing query:', err);
                res.status(500).json({error: 'Error retrieving coaches from the database.'});
                return;
            }
            res.json(results);
        })
    })

    app.get('/api/coaches-search-name', (req, res) => {
        const searchTerm = req.query.name || ''
        const query = `SELECT coach.CoachID, user.firstName, user.lastName 
                       FROM coach 
                       INNER JOIN user ON user.UserID = coach.CoachID 
                       WHERE CONCAT(user.firstName, ' ', user.lastName) LIKE '%${searchTerm}%' 
                       GROUP BY coach.CoachID ORDER BY coach.CoachID`
    
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Error retrieving coaches from the database.' });
                return;
            }
            res.json(results);
        })
    })
}