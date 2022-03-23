const dataRouter = require('express').Router()

dataRouter.get('/', async (req, res) => {
    res.json({result: 'tets'})
})

dataRouter.get('/trips/:name', async (req, res) => {
    const name = req.params.name
    const trips = require(`../temp/trips/${name}/trips.json`)
    res.json(trips)
})

dataRouter.get('/spending/:name', async (req, res) => {
    const name = req.params.name
    const spending = require(`../temp/spending/${name}/spending.json`)
    res.json(spending)
})

module.exports = dataRouter