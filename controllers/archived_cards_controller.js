const Card = require('../models/Card')
const { Op } = require('sequelize')

const getArchivedCardsPage = async (req, res, next) => {
    const archivedCards = await Card.getAllArchivedCardsWithRows()
    res.render('archived_cards.ejs', {
        title: 'Archived cards',
        path: '/archived_cards',
        archivedCards: archivedCards
    })
}

exports.getArchivedCardsPage = getArchivedCardsPage