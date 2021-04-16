const express = require('express')
const archiveCardController = require('../controllers/archived_cards_controller')

const router = express.Router()

router.get('/archived_cards', archiveCardController.getArchivedCardsPage)

exports.router = router;