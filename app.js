/* =======================
    LOAD THE DEPENDENCIES
==========================*/
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')
/* =======================
LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 3002

/* =======================
EXPRESS CONFIGURATION
==========================*/
const app = express()
// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 204,
  credentials: true,
}

app.use(cors(corsOptions))

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
  res.send('Hello JWT')
})

// configure api router
app.use('/api', require('./routes/api'))

// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()
