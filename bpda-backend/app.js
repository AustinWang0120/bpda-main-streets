require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const usersRouter = require('./controllers/users')
const mapsRouter = require('./controllers/maps')
const dataRouter = require('./controllers/data')

// connect to firebase in config.js

// middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// routers
// usersRouter: getUser, createUser, updateUser, removeUser
// mapsRouter: boundary, districts, getBusiness, createBusiness, updateBusiness, removeBusiness
// tripsRouter: getDataset, updateDataset
// spendingRouter: getDataset, updateDataset
app.use('/api/users', usersRouter)
app.use('/api/maps', mapsRouter)
app.use('/api/data', dataRouter)

module.exports = app