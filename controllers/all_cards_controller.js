const { fetchAll } = require('../models/card');
const Card = require('../models/card')

const getAllCardsPage = (req, res, next) => {
    const path = 'all_cards';
    fetchAll(cards => {
        res.render('all_cards', {
            path: path,
            allCards: cards
        })
    })
}

exports.getAllCardsPage = getAllCardsPage;