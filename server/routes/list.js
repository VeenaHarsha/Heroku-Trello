const router = require('express').Router()
const { getLists, addList, updateListPosition, updateListTitle } = require('../models/list-queries')

router.get('/:boardId', getLists)
router.post('/add', addList)
router.put('/updateListPosition', updateListPosition)
router.put('/updateListTitle/:id', updateListTitle)

module.exports = router
