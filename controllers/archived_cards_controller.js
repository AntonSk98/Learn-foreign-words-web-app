const Card = require('../models/Card')
const StickerRow = require('../models/StickerRow')
const { Op } = require('sequelize')

const getArchivedCardsPage = async (req, res, next) => {
    const archivedCards = await Card.getAllArchivedCards()
    res.render('archived_cards.ejs', {
        title: 'Archived cards',
        path: '/archived_cards',
        archivedCards: archivedCards
    })
}

exports.getArchivedCardsPage = getArchivedCardsPage