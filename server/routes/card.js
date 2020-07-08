const router = require('express').Router()

const { getCards, addCard, updateCardPosition, deleteCard, updateCardTitle, updateListIdInCard } = require('../models/card-queries')

router.get('/', getCards)
router.post('/add', addCard)
router.put('/updatePosition', updateCardPosition)
router.put('/updateCardTitle/:id', updateCardTitle)
router.put('/updateListId', updateListIdInCard)
router.delete('/delete/:id', deleteCard)

module.exports = router
