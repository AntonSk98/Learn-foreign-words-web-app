const Card = require('../models/Card')
const Row = require('../models/Row')

const getAllCardsPage = async (req, res, next) => {
    const path = 'all_cards';
    const cards = await Card.getAllActiveCards()
    res.render('all_cards', {
        path: path,
        allCards: cards
    })
}

exports.getAllCardsPage = getAllCardsPage;