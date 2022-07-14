// Import packages
const express = require('express')
const port = 9000
const mongoose = require('mongoose')

// Middlewares
const app = express()
app.use(express.json())

// Routes
const home = require('./routes/home')
app.use('/home', home)
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
