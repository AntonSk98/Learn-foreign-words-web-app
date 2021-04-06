const WordRow = require('../models/word_row')

const getAddNewCardPage = (req, res, next) => {
    const wordRow1 = new WordRow('a', 'b', 'c');
    res.render('new_card')
}

exports.getAddNewCardPage = getAddNewCardPage;