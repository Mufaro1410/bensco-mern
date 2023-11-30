require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const express = require('express');
const app = express();

const connectDB = require('./db/connect')
// const authenticateUser = require('./middleware/authentication')

const login = require('./routes/login')
const users = require('./routes/users')
const telematics = require('./routes/telematics')
const zones = require('./routes/zones')
const trips = require('./routes/trips')
const trucks = require('./routes/trucks')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

// middleware

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({ extended: true }));

// routes

app.use('/', login)
app.use('/users', users)
app.use('/telematics', telematics)
app.use('/zones', zones)
app.use('/trips', trips)
app.use('/trucks', trucks)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()