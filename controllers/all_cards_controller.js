const Card = require('../models/Card')

const getAllCardsPage = async (req, res, next) => {
    const path = 'all_cards';
    const cards = await Card.getAllActiveCardsWithRows()
    res.render('all_cards', {
        path: path,
        allCards: cards
    })
}

exports.getAllCardsPage = getAllCardsPage;