const connection = require('./config/database')

module.exports = (app) => {

    app.get('/api/users', (req, res) => {
        const query = 'SELECT * FROM User'
    
        connection.query(query, (err, results) => {
            if(err) {
                console.error('Error executing query:', err);
                res.status(500).json({error: 'Error retrieving users from the database.'});
                return;
            }
            res.json(results);
        })
    })
}