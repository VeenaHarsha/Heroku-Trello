const { loginUser, getUserDetails } = require('../models/auth-queries')
const router = require('express').Router()
const authorize = require('../middleware/auth')

router.get('/user', authorize, getUserDetails)

router.post('/', loginUser)

module.exports = router
