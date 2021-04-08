const express = require('express')
const router = express.Router();

const newCardController = require('../controllers/new_card_controller');

router.get('/add_new_card', newCardController.getAddNewCardPage);

router.post('/add_new_card', newCardController.addNewCard);

exports.router = router;