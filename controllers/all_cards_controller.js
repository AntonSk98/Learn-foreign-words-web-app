const Card = require('../models/card')

const getAllCardsPage = (req, res, next) => {
    const path = 'all_cards';
    Card.fetchAllActiveCards(cards => {
        res.render('all_cards', {
            path: path,
            allCards: cards
        })
    })
}

exports.getAllCardsPage = getAllCardsPage;