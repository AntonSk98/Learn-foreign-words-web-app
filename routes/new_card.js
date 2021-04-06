const express = require('express')
const router = express.Router();

const newCardController = require('../controllers/new_card_controller');

router.get('/add_new_card', newCardController.getAddNewCardPage)

exports.router = router;