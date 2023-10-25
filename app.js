const express = require('express')
const app = express()

const cors = require('cors') // needed to test locally
const corsOptions = { origin: 'http://localhost:3000' } // url from frontend/react
app.use(cors(corsOptions))
app.use(express.json()) // needed to get body from POST request

app.get('/', (req, res) => {
  res.send('Hello, this is the backend of your CS490 exercise app!')
})

app.get('/health-check', (req, res) => {
  res.json({ status: 'Working!!!' })
})

module.exports = app
