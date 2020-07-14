const router = require('express').Router()
const { getLists, addList, updateListPosition, updateListTitle } = require('../models/list-queries')
const authorize = require('../middleware/auth')

router.get('/:boardId', authorize, getLists)
router.post('/add', authorize, addList)
router.put('/updateListPosition', authorize, updateListPosition)
router.put('/updateListTitle/:id', authorize, updateListTitle)

module.exports = router
