const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card_controller')

router.post('/edit_card/:cardId', cardController.editCardPage)

router.post('/edit_card', cardController.editCard)

router.get('/archive_card/:cardId', cardController.archiveCard)

router.get('/remove_card/:cardId', cardController.removeCard)

router.get('/unarchive_card/:cardId', cardController.unarchiveCard)

router.get('/learn_card/:cardId', cardController.learnCardPage)

router.post('/reduce_card_progress/:cardId', cardController.reduceCardProgress)

router.post('/improve_card_progress/:cardId', cardController.improveCardProgress)

exports.router = router;