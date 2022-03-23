const config = require('../utils/config')
const { createUserWithEmailAndPassword } = require('firebase/auth')
const { child, set } = require('firebase/database')
const usersRouter = require('express').Router()

// get auth and database
const auth = config.auth
const dbRef = config.dbRef

// routers
// create a user
usersRouter.post('/', async (req, res) => {
    // get email and password
    const email = req.body.email
    const password = req.body.password
    try {
        // register with the auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        // add property of admin level
        const user = userCredential.user
        const userInfo = {
            // role -> user || manager || admin
            role: 'user'
        }
        await set(child(dbRef, `users/${user.uid}`), userInfo)
        res.status(200).json({
            result: 'successfully sign up',
            user: user
        })
    } catch (error) {
        res.status(400).json({
            code: error.code,
            message: error.message
        })
    }
})

module.exports = usersRouter