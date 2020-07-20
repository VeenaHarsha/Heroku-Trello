const router = require('express').Router()

const { getCards, addCard, updateCardPosition, deleteCard, updateCardTitle, updateListIdInCard, updateDuedate } = require('../models/card-queries')

router.get('/', getCards)
router.post('/add', addCard)
router.put('/updatePosition', updateCardPosition)
router.put('/updateCardTitle/:id', updateCardTitle)
router.put('/updateDuedate/:id', updateDuedate)
router.put('/updateListId', updateListIdInCard)
router.delete('/delete/:id', deleteCard)

module.exports = router
