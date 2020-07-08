const router = require('express').Router()
const { registerUser } = require('../models/user-queries')

router.post('/register', registerUser)

module.exports = router
