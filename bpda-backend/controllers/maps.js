const config = require('../utils/config')
const { get, child, set, push, update, remove } = require('@firebase/database')
const mapsRouter = require('express').Router()

// get database
const auth = config.auth
const dbRef = config.dbRef

// routers
mapsRouter.get('/', async (req, res) => {
    res.json({result: 'test'})
})

// get boston boundary
mapsRouter.get('/bostonboundary', async (req, res) => {
    const bostonBoundary = require('../temp/maps/Boston_Boundary.json')
    res.json(bostonBoundary)
})

// get main street districts
mapsRouter.get('/mainstreetdistricts', async (req, res) => {
    const mainStreetDistricts = require('../temp/maps/Main_Street_Districts.json')
    res.json(mainStreetDistricts)
})

// get main street business points with street name
mapsRouter.get('/mainstreetbusiness/:name', async (req, res) => {
    const name = req.params.name
    const snapshot = await get(child(dbRef, `business/${name}`))
    if (snapshot.exists()) {
        res.json(Object.values(snapshot.val()))
    } else {
        res.json({error: 'invalid street name'})
    }
})

// get a main street business point with id
mapsRouter.get('/mainstreetbusiness/:name/:id', async (req, res) => {
    const name = req.params.name
    const id = req.params.id
    const snapshot = await get(child(dbRef, `business/${name}/${id}`))
    if (snapshot.exists()) {
        res.json(snapshot.val())
    } else {
        res.json({error: 'invalid street name or id'})
    }
})

// add a main street business point
mapsRouter.post('/mainstreetbusiness/:name', async (req, res) => {
    const name = req.params.name
    const newInfo = req.body
    // add street and id
    const newInfoKey = push(child(dbRef, `business/${name}`)).key
    newInfo.street = name
    newInfo.id = newInfoKey
    // push the update
    updates = {}
    updates[`business/${name}/${newInfoKey}`] = newInfo
    await update(dbRef, updates)
    res.status(200).json({ result: `successfully add ${newInfoKey}`})
})

// update a main street business point by id
mapsRouter.put('/mainstreetbusiness/:name/:id', async (req, res) => {
    const name = req.params.name
    const id = req.params.id
    // update by setting
    const newInfo = req.body
    await set(child(dbRef, `business/${name}/${id}`), newInfo)
    res.status(200).json({result: 'successfully update'})
})

// remove a main street business point by id
mapsRouter.delete('/mainstreetbusiness/:name/:id', async (req, res) => {
    const name = req.params.name
    const id = req.params.id
    // remove by path
    await remove(child(dbRef, `business/${name}/${id}`))
    res.status(200).json({result: 'successfully remove'})
})

module.exports = mapsRouter