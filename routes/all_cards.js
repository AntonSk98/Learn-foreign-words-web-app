const express = require('express');
const router = express.Router();

const allCardsController = require('../controllers/all_cards_controller')

router.get('/all_cards', allCardsController.getAllCardsPage)

exports.router = router;