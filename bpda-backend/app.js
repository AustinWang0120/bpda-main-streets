require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
const mapsRouter = require('./controllers/maps')
const dataRouter = require('./controllers/data')

// connect to database
// handle by config

// middlewares
app.use(cors())
app.use(express.json())

// routers
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/maps', mapsRouter)
app.use('/api/data', dataRouter)

module.exports = app