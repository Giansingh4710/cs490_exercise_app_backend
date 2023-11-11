const express = require('express')
const app = express()
const connection = require('./config/database')
const register = require('./Routes/Register')

const cors = require('cors') // needed to test locally
const corsOptions = { origin: 'http://localhost:3000' } // url from frontend/react
app.use(cors(corsOptions))
app.use(express.json()) // needed to get body from POST request

app.get('/', (req, res) => {
  res.send('Hello, this is the backend of your CS490 exercise app!')
})

app.get('/health-check', (req, res) => {
  connection.query('SELECT * from User', (err, rows) => {
    if (err) throw err
    res.json(rows)
  })
})

app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM User'

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err)
      res.status(500).json({
        error: 'Error retrieving users from the database.',
      })
      return
    }
    res.json(results)
  })
})

app.use('/', register)

module.exports = app
