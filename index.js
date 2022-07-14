// Import packages
const express = require('express')
const port = 9000
const mongoose = require('mongoose')

// Middlewares
const app = express()
app.use(express.json())
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})
// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Account Microservice.')
})

const login = require('./routes/login')
app.use('/login', login)
const renewal = require('./routes/renewal')
app.use('/renewal', renewal)
const decrement = require('./routes/decrement')
app.use('/decrement', decrement)

// Connect to DB
mongoose.connect(
  'mongodb+srv://ktrip:rNHmX6x2PD4eJrG4@accountcluster.s1g9j5j.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database established successfully')
})

// connection
app.listen(port, () => console.log(`Listening to port ${port}`))
