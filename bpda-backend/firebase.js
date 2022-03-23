const config = require('./utils/config')
const { get, push, child, ref, update, remove} = require('firebase/database')

const database = config.database

// get business data
const business = require('./temp/maps/MainStreets_Business_List.json').points

const init = async () => {
    for (const {FIELD1, ...point} of business) {
        point.street = point.mainstreet.toLowerCase().replace(/[^a-zA-Z]+/g, '')
        const newPointKey = push(child(ref(database), `business/${point.street}`)).key
        point.id = newPointKey
        const updates = {}
        updates[`business/${point.street}/${newPointKey}`] = point
        await update(ref(database), updates)
        console.log(`${FIELD1} has been added`)
    }
}

const getAll = async () => {
    const dbRef = ref(database)
    get(child(dbRef, 'business/allstonvillage/-MykHn0P8S9Alg96xAdh')).then(snapshot => {
        if (snapshot.exists()) {
            console.log(snapshot.val())
        }
    })
}

const removeAll = async () => {
    const dbRef = ref(database)
    remove(child(dbRef, 'business')).then(() => {
        console.log('delete')
    })
}

init()