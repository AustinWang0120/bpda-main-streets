const { initializeApp } = require('firebase/app')
const { connectDatabaseEmulator, getDatabase, ref } = require('firebase/database')
const { connectAuthEmulator, getAuth } = require('firebase/auth')

const PORT = process.env.PORT
console.log(process.env.APIKEY)
const FIREBASECONFIG = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
}
const FIREBASEAPP = initializeApp(FIREBASECONFIG)
const DATABASE = getDatabase(FIREBASEAPP)
const AUTH = getAuth()
if (process.env.NODE_ENV === 'development') {
    connectDatabaseEmulator(DATABASE, 'localhost', 9000)
    connectAuthEmulator(AUTH, 'http://localhost:9099')
}
const DBREF = ref(DATABASE)

module.exports = {
    PORT,
    database: DATABASE,
    dbRef: DBREF,
    auth: AUTH
}