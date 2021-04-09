const Card = require('../models/card')

const getAllCardsPage = (req, res, next) => {
    const path = 'all_cards';
    res.render('all_cards', {
        path: path,
        allCards: Card.fetchAll() // I stopped here!
    })
}

exports.getAllCardsPage = getAllCardsPage;