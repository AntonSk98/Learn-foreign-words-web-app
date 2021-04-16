const express = require('express')
const router = express.Router()

const cardController = require('../controllers/card_controller')

router.post('/edit_card/:cardId', cardController.editCardPage)

router.post('/edit_card', cardController.editCard)

router.get('/archive_card/:cardId', cardController.archiveCard)

exports.router = router;