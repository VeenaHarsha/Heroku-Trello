const router = require('express').Router()
const { getBoards, addBoard, updateBoardTitle } = require('../models/board-queries')
const authorize = require('../middleware/auth')

router.get('/:userid', authorize, getBoards)
router.post('/add', authorize, addBoard)
router.put('/updateBoardTitle/:id', authorize, updateBoardTitle)

module.exports = router
