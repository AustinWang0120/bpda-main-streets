const config = require('../utils/config')
const { signInWithEmailAndPassword } = require('firebase/auth')
const authRouter = require('express').Router()

// get auth
const auth = config.auth

// routers -> only for testing this router
authRouter.post('/test', async (req, res) => {
    if (auth.currentUser) {
        res.json({ user: auth.currentUser })
    } else {
        res.json({ result: 'no user logged in yet' })
    }
})

// login -> change auth.currentUser
authRouter.post('/login', async (req, res) => {
    // get email and password
    const email = req.body.email
    const password = req.body.password
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        res.status(200).json({user: userCredential.user})
    } catch (error) {
        res.status(400).json({
            code: error.code,
            message: error.message
        })
    }
})

// logout -> remove auth.currentUser
authRouter.post('/logout', async (req, res) => {
    try {
        await auth.signOut()
        res.status(200).json({result: 'successfully log out'})
    } catch (error) {
        res.status(400).json({
            code: error.code,
            message: error.message
        })
    }
})

module.exports = authRouter