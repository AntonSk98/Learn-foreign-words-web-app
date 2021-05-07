const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')

const getAllCardsPage = async (req, res, next) => {
    const path = 'all_cards';
    const cards = await Card.getAllActiveCards()
    res.render('all_cards', {
        path: path,
        allCards: cards
    })
}

exports.getAllCardsPage = getAllCardsPage;