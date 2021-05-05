const WordRow = require('../models/word_row')
const Card = require('../models/card')

const getAddNewCardPage = (req, res, next) => {
    const path = 'add_new_card';
    res.render('new_edit_card', {
        path: path,
        card: undefined
    })
}

const addNewCard = (req, res, next) => {
    console.log(req.body)
}


exports.getAddNewCardPage = getAddNewCardPage;
exports.addNewCard = addNewCard;